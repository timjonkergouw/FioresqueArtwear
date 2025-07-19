// Product data
const products = [
    {
        id: 1,
        name: "Logo Tee White",
        price: 40.00,
        category: "shirts",
        frontImage: "images/white tee logo back.png",
        backImage: "images/white tee logo front.png"
    },
    {
        id: 2,
        name: "Logo Tee Black",
        price: 40.00,
        category: "shirts",
        frontImage: "images/logo tee zwart achterkant.png",
        backImage: "images/logo tee zwart voorkant.png"
    },
    {
        id: 3,
        name: "Fioresque Blurry Tee",
        price: 40.00,
        category: "shirts",
        frontImage: "images/fioresque blurry achterkant.png",
        backImage: "images/fioresque blurry voorkant.png"
    },
    {
        id: 4,
        name: "Logo Hoodie Black",
        price: 40.00,
        category: "hoodies",
        frontImage: "images/logo hoodie zwart achterkant.png",
        backImage: "images/logo hoodie zwart voorkant.png"
    }
];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupFilterListeners();
    
    // Check for URL parameter to auto-filter
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    const categoryParam = urlParams.get('category');
    const param = categoryParam || filterParam;
    
    if (param) {
        // Find and click the appropriate filter button
        const filterButton = document.querySelector(`[data-category="${param}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }
});

// Display products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productElement = createProductElement(product);
        productsGrid.appendChild(productElement);
    });
}

// Create product element
function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.setAttribute('data-category', product.category);
    
    productDiv.innerHTML = `
        <div class="product-image-container">
            <img src="${product.frontImage}" alt="${product.name} Front" class="product-front">
            <img src="${product.backImage}" alt="${product.name} Back" class="product-back">
        </div>
    `;
    
    // Add click event to navigate to product detail
    productDiv.addEventListener('click', function() {
        window.location.href = `product-detail.html?id=${product.id}`;
    });
    
    return productDiv;
}

// Setup filter listeners
function setupFilterListeners() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(category);
        });
    });
}

// Filter products
function filterProducts(category) {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Logo hover effect
function setupLogoHover() {
    const logoImg = document.getElementById('logoImg');
    console.log('Logo element:', logoImg); // Debug log
    
    if (logoImg) {
        const originalSrc = 'images/fioresque wit.png';
        const hoverSrc = 'images/fioresque bloem wit.png';
        
        console.log('Original src:', originalSrc); // Debug log
        console.log('Hover src:', hoverSrc); // Debug log
        
        logoImg.addEventListener('mouseenter', function() {
            console.log('Mouse enter - changing to hover image'); // Debug log
            this.src = hoverSrc;
        });
        
        logoImg.addEventListener('mouseleave', function() {
            console.log('Mouse leave - changing back to original'); // Debug log
            this.src = originalSrc;
        });
    } else {
        console.log('Logo element not found!'); // Debug log
    }
}

// Setup logo hover effect
setupLogoHover();

// Add to cart functionality (extends the main script)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        e.stopPropagation();
        
        if (!isLoggedIn) {
            alert('Please login first to add items to cart');
            toggleLogin();
            return;
        }
        
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            addToCart({
                id: Date.now(),
                name: product.name,
                price: product.price,
                image: product.frontImage,
                quantity: 1
            });
        }
    }
});

 