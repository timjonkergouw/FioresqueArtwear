// Product data (same as in products.js)
const products = [
    {
        id: 1,
        name: "Fruit Shirt",
        price: 40.00,
        category: "shirts",
        frontImage: "images/fruit shirt back.png",
        backImage: "images/fruit shirt front.png",
        description: "Een uniek shirt met een fruit design dat perfect past bij de Fiori stijl. Gemaakt van hoogwaardige materialen voor comfort en duurzaamheid.",
        material: "100% Katoen",
        careInstructions: "Machine wassen op 30°C, niet bleken",
        origin: "Gemaakt in Nederland"
    },
    {
        id: 2,
        name: "Tropical Shirt",
        price: 40.00,
        category: "shirts",
        frontImage: "images/tropical shirt back.png",
        backImage: "images/tropical shirt front.png",
        description: "Een tropisch shirt met levendige kleuren en een exotisch design. Perfect voor zomerdagen en vakantie sfeer.",
        material: "100% Katoen",
        careInstructions: "Machine wassen op 30°C, niet bleken",
        origin: "Gemaakt in Nederland"
    },
    {
        id: 3,
        name: "Vase Shirt",
        price: 40.00,
        category: "shirts",
        frontImage: "images/vase shirt back.png",
        backImage: "images/vase shirt front.png",
        description: "Een elegant shirt met een vaas design dat kunst en mode combineert. Uniek en stijlvol voor elke gelegenheid.",
        material: "100% Katoen",
        careInstructions: "Machine wassen op 30°C, niet bleken",
        origin: "Gemaakt in Nederland"
    },
    {
        id: 4,
        name: "Flower House Shirt",
        price: 40.00,
        category: "shirts",
        frontImage: "images/flower house back.png",
        backImage: "images/flower house front.png",
        description: "Een prachtig shirt met een bloemenhuis design dat natuur en architectuur combineert. Perfect voor de Fiori collectie.",
        material: "100% Katoen",
        careInstructions: "Machine wassen op 30°C, niet bleken",
        origin: "Gemaakt in Nederland"
    }
];

// Global variables
let currentProduct = null;
let selectedSize = null;

// DOM elements
const mainImage = document.getElementById('mainImage');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productDescription = document.getElementById('productDescription');
const material = document.getElementById('material');
const careInstructions = document.getElementById('careInstructions');
const origin = document.getElementById('origin');
const addToCartBtn = document.getElementById('addToCartBtn');
const sizeButtons = document.querySelectorAll('.size-btn');
const thumbnails = document.querySelectorAll('.thumbnail');

// Initialize product detail page
document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
    setupEventListeners();
    updateAddToCartButton();
});

// Load product based on URL parameter
function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) {
        // Redirect to products page if product not found
        window.location.href = 'products.html';
        return;
    }
    
    displayProduct();
}

// Display product information
function displayProduct() {
    // Set main content
    productName.textContent = currentProduct.name;
    productPrice.textContent = `€${currentProduct.price.toFixed(2)}`;
    productDescription.textContent = currentProduct.description;
    material.textContent = currentProduct.material;
    careInstructions.textContent = currentProduct.careInstructions;
    origin.textContent = currentProduct.origin;
    
    // Set images
    mainImage.src = currentProduct.frontImage;
    mainImage.alt = `${currentProduct.name} Front`;
    
    // Set thumbnails
    const thumbnailImages = [
        currentProduct.frontImage,
        currentProduct.backImage,
        currentProduct.frontImage, // Additional detail images (using front as placeholder)
        currentProduct.backImage   // Additional detail images (using back as placeholder)
    ];
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.src = thumbnailImages[index];
        thumbnail.setAttribute('data-image', thumbnailImages[index]);
    });
    
    // Update page title
    document.title = `${currentProduct.name} - Fiori`;
}

// Setup event listeners
function setupEventListeners() {
    // Thumbnail click events
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            mainImage.src = imageSrc;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Size selection
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedSize = this.getAttribute('data-size');
            updateAddToCartButton();
        });
    });
    

    
    // Add to cart button
    addToCartBtn.addEventListener('click', function() {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        
        // Use global addToCart function
        if (typeof addToCart === 'function') {
            addToCart({
                name: currentProduct.name,
                price: currentProduct.price,
                image: currentProduct.frontImage,
                quantity: 1,
                size: selectedSize
            });
        } else {
            alert('Shopping cart functionality is currently being updated. Please check back soon!');
        }
    });
}

// Update add to cart button state
function updateAddToCartButton() {
    if (selectedSize) {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = 'Add to Cart';
    } else {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'Select Size';
    }
}

// Logo hover effect
function setupLogoHover() {
    const logoImg = document.getElementById('logoImg');
    
    if (logoImg) {
        const originalSrc = 'images/fiori logo zwartwit.png';
        const hoverSrc = 'images/fiori logo.png';
        
        logoImg.addEventListener('mouseenter', function() {
            this.src = hoverSrc;
        });
        
        logoImg.addEventListener('mouseleave', function() {
            this.src = originalSrc;
        });
        
        // Add click event to navigate to home
        logoImg.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}

// Setup logo hover effect
setupLogoHover(); 