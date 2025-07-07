// Global variables
let isLoggedIn = false;
let cart = [];

// DOM elements
const accountIcon = document.getElementById('accountIcon');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const loginForm = document.querySelector('.login-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    setupEventListeners();
    checkLoginStatus();
    updateCartDisplay();
});

// Setup event listeners
function setupEventListeners() {
    // Cart functionality
    const cartIcon = document.getElementById('cartIcon');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartIcon) cartIcon.addEventListener('click', toggleCart);
    if (closeCart) closeCart.addEventListener('click', toggleCart);
    
    // Login functionality
    if (accountIcon) accountIcon.addEventListener('click', toggleLogin);
    if (closeLogin) closeLogin.addEventListener('click', toggleLogin);
    
    // Login form submission
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartOverlay) {
            toggleCart();
        }
        if (event.target === loginModal) {
            toggleLogin();
        }
    });
    
    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', handleNewsletterSubscription);
    }
    
    // Shop now button
    const shopNowBtn = document.querySelector('.shop-now-btn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function() {
            window.location.href = 'products.html';
        });
    }
    
    // New Arrivals click functionality
    setupNewArrivalsClicks();
}

// Cart functions
function addToCart(product) {
    // Create unique identifier for the product
    const productKey = product.size ? `${product.name}-${product.size}` : product.name;
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => {
        const itemKey = item.size ? `${item.name}-${item.size}` : item.name;
        return itemKey === productKey;
    });
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            ...product,
            id: Date.now() + Math.random() // Ensure unique ID
        });
    }
    
    saveCartToStorage();
    updateCartDisplay();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartDisplay();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCartToStorage();
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    // Update cart count if cart count element exists
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Update cart items display if cart items element exists
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Display name with size if available
        const displayName = item.size ? `${item.name} (${item.size})` : item.name;
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${displayName}</h4>
                <p>€${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">&times;</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.classList.toggle('active');
    }
}

// Storage functions
function saveCartToStorage() {
    localStorage.setItem('fioriCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('fioriCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Login functions
function toggleLogin() {
    if (loginModal) {
        loginModal.classList.toggle('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;
    
    // Simple validation (in a real app, this would be server-side)
    if (email && password) {
        isLoggedIn = true;
        localStorage.setItem('fioriLoggedIn', 'true');
        toggleLogin();
        showNotification('Successfully logged in!');
        
        // Update UI to show logged in state
        if (accountIcon) {
            accountIcon.innerHTML = '<i class="fas fa-user-check"></i>';
        }
    } else {
        alert('Please enter both email and password');
    }
}

// Check if user is already logged in
function checkLoginStatus() {
    const loggedIn = localStorage.getItem('fioriLoggedIn');
    if (loggedIn === 'true') {
        isLoggedIn = true;
        if (accountIcon) {
            accountIcon.innerHTML = '<i class="fas fa-user-check"></i>';
        }
    }
}

// Newsletter subscription
function handleNewsletterSubscription() {
    const emailInput = document.querySelector('.newsletter-input');
    const email = emailInput.value;
    
    if (email && isValidEmail(email)) {
        showNotification('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address');
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #00DD1A;
        color: white;
        padding: 1rem 2rem;
        z-index: 1003;
        animation: slideIn 0.3s ease;
        font-family: 'Days One', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

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

// New Arrivals click functionality
function setupNewArrivalsClicks() {
    const newArrivalsItems = document.querySelectorAll('.new-arrivals-item');
    
    newArrivalsItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Navigate to product detail page with product ID
            const productId = index + 1; // Assuming products are in order
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
} 