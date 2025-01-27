// Pobieranie elementu paska promocyjnego
const promoBar = document.getElementById('promo-bar');

// Funkcja sprawdzająca widoczność paska
const checkScrollPosition = () => {
    if (window.scrollY === 0) {
        // Jeśli strona jest na samej górze, pokaż pasek
        promoBar.classList.add('visible');
        promoBar.classList.remove('hidden');
    } else {
        // Ukryj pasek, gdy strona jest przewijana w dół
        promoBar.classList.remove('visible');
        promoBar.classList.add('hidden');
    }
};

// Wywołanie sprawdzania po załadowaniu strony
window.addEventListener('load', checkScrollPosition);

// Wywołanie sprawdzania podczas przewijania
window.addEventListener('scroll', checkScrollPosition);

document.querySelector('.search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Zatrzymuje domyślną akcję (przekierowanie)
    const query = document.querySelector('.search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

const menuOverlay = document.getElementById('menu-overlay');
const menuButton = document.getElementById('menu-button');

// Funkcja do otwierania/zamykania menu
menuButton.addEventListener('click', () => {
    if (menuOverlay.classList.contains('show')) {
        menuOverlay.classList.remove('show');
        menuButton.classList.remove('hidden'); // Przywraca widoczność przycisku
    } else {
        menuOverlay.classList.add('show');
        menuButton.classList.add('hidden'); // Ukrywa przycisk
    }
});

// Zamknięcie menu po zjechaniu kursorem z menu
menuOverlay.addEventListener('mouseleave', () => {
    if (menuOverlay.classList.contains('show')) {
        menuOverlay.classList.remove('show');
        menuButton.classList.remove('hidden'); // Przywraca widoczność przycisku
    }
});

const categoryLinks = document.querySelectorAll('.menu-items a');

categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.textContent.trim();
        const products = document.querySelectorAll('.product');

        if (category === "Wszystkie produkty") {
            // Pokaż wszystkie produkty
            products.forEach(product => {
                product.style.display = 'block';
            });
        } else {
            // Filtruj produkty na podstawie kategorii
            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                product.style.display = productCategory === category ? 'block' : 'none';
            });
        }
    });
});

// Funkcja do pobrania parametrów z URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Po załadowaniu strony sprawdź kategorię z URL
window.addEventListener('load', () => {
    const category = getQueryParam('category');
    const products = document.querySelectorAll('.product');

    if (category) {
        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            product.style.display = productCategory === category ? 'block' : 'none';
        });
    } else {
        // Jeśli brak kategorii, pokaż wszystkie produkty
        products.forEach(product => {
            product.style.display = 'block';
        });
    }
});


// Funkcja do pobrania parametrów z URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Funkcja normalizująca tekst (usuwa polskie znaki i konwertuje na małe litery)
function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/ą/g, "a")
        .replace(/ć/g, "c")
        .replace(/ę/g, "e")
        .replace(/ł/g, "l")
        .replace(/ń/g, "n")
        .replace(/ó/g, "o")
        .replace(/ś/g, "s")
        .replace(/ź/g, "z")
        .replace(/ż/g, "z");
}

// Po załadowaniu strony sprawdź parametr wyszukiwania
window.addEventListener('load', () => {
    const searchQuery = getQueryParam('search');
    const products = document.querySelectorAll('.product');

    if (searchQuery) {
        const normalizedSearch = normalizeText(searchQuery);

        products.forEach(product => {
            const productName = normalizeText(product.querySelector('h3').textContent);
            const productCategory = normalizeText(product.getAttribute('data-category'));

            if (productName.includes(normalizedSearch) || productCategory.includes(normalizedSearch)) {
                product.style.display = 'block'; // Pokaż produkt, jeśli pasuje do wyszukiwania
            } else {
                product.style.display = 'none'; // Ukryj produkt, jeśli nie pasuje
            }
        });
    } else {
        // Jeśli brak wyszukiwania, pokaż wszystkie produkty
        products.forEach(product => {
            product.style.display = 'block';
        });
    }
});
