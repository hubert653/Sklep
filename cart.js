let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
        <img width="100" src=${search.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price"> ${search.price} zł</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3> ${item * search.price} zł</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Koszyk jest pusty</h2>
    <a href="index.html">
      <button class="HomeBtn">Powróć na stronę główną</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Całkowita wartość zamówienia : ${amount}  zł</h2>
    <button class="checkout">Przejdź do płatności</button>
    <button onclick="clearCart()" class="removeAll">Opróżnij koszyk</button>
    `;
  } else return;
};

TotalAmount();



document.addEventListener("DOMContentLoaded", () => {
  // Pobierz przycisk Dodaj do koszyka na stronie szczegółowej
  const addToCartButton = document.querySelector(".add-to-cart");

  // Sprawdź, czy przycisk istnieje
  if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
          const productId = addToCartButton.getAttribute("data-id");
          const productName = addToCartButton.getAttribute("data-name");
          const productPrice = parseFloat(addToCartButton.getAttribute("data-price"));

          // Dodaj produkt do koszyka
          addToCart(productId, productName, productPrice);
      });
  }

  // Zaktualizuj ikonę koszyka
  updateCartIcon();
});

function addToCart(productId, productName, productPrice) {
  let basket = JSON.parse(localStorage.getItem("data")) || [];
  let product = basket.find((item) => item.id === productId);

  if (product) {
      product.item += 1;
  } else {
      basket.push({ id: productId, name: productName, item: 1, price: productPrice });
  }

  localStorage.setItem("data", JSON.stringify(basket));
  updateCartIcon();
}

function updateCartIcon() {
  const basket = JSON.parse(localStorage.getItem("data")) || [];
  const cartAmount = basket.reduce((total, item) => total + item.item, 0);
  const cartIcon = document.getElementById("cartAmount");

  if (cartIcon) {
      cartIcon.innerText = cartAmount;
  }
}