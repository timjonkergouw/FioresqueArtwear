// Global variables
let isLoggedIn = false;
let cart = [];
let isCheckoutActive = false;

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
    
    // Hamburger menu functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link:not(.shop-toggle)');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Shop dropdown functionality
        const shopToggle = document.getElementById('shopToggle');
        const shopDropdown = document.getElementById('shopDropdown');
        
        if (shopToggle && shopDropdown) {
            shopToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleShopDropdown();
            });
        }
        
        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartOverlay) {
            toggleCart();
        }
        if (event.target === loginModal) {
            toggleLogin();
        }
        if (event.target === mobileMenu) {
            closeMobileMenu();
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
    
    // Setup logo hover functionality
    setupLogoHover();
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
    localStorage.setItem('fioresqueCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('fioresqueCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Checkout functions
function startCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    if (!isLoggedIn) {
        alert('Please login first to proceed with checkout');
        toggleLogin();
        return;
    }
    
    isCheckoutActive = true;
    showCheckoutModal();
}

function showCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.add('active');
        updateCheckoutDisplay();
    }
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.remove('active');
        isCheckoutActive = false;
    }
}

function updateCheckoutDisplay() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutShipping = document.getElementById('checkoutShipping');
    
    if (!checkoutItems) return;
    
    checkoutItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        
        const displayName = item.size ? `${item.name} (${item.size})` : item.name;
        
        checkoutItem.innerHTML = `
            <div class="checkout-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="checkout-item-details">
                <h4>${displayName}</h4>
                <p>€${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="checkout-item-total">
                €${itemTotal.toFixed(2)}
            </div>
        `;
        
        checkoutItems.appendChild(checkoutItem);
    });
    
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `€${subtotal.toFixed(2)}`;
    if (checkoutShipping) checkoutShipping.textContent = `€${shipping.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `€${total.toFixed(2)}`;
}

function processPayment(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate payment processing
    const processBtn = form.querySelector('.process-payment-btn');
    const originalText = processBtn.textContent;
    processBtn.textContent = 'Processing...';
    processBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate successful payment
        showNotification('Payment successful! Your order has been placed.');
        cart = [];
        saveCartToStorage();
        updateCartDisplay();
        closeCheckoutModal();
        toggleCart();
        
        // Reset form
        form.reset();
        processBtn.textContent = originalText;
        processBtn.disabled = false;
    }, 2000);
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
        localStorage.setItem('fioresqueLoggedIn', 'true');
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
    const loggedIn = localStorage.getItem('fioresqueLoggedIn');
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
        background: #4EC977;
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
    const mobileLogoImg = document.querySelector('.mobile-logo-img');
    
    // Check if we're on the home page or other pages
    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
    console.log('Current page:', window.location.pathname);
    console.log('Is home page:', isHomePage);
    
    // Desktop logo hover effect
    if (logoImg) {
        let originalSrc, hoverSrc;
        
        if (isHomePage) {
            // Home page: flower as default, text on hover
            originalSrc = 'images/fioresque bloem wit.png';
            hoverSrc = 'images/fioresque wit.png';
        } else {
            // Other pages: text as default, flower on hover
            originalSrc = 'images/fioresque wit.png';
            hoverSrc = 'images/fioresque bloem wit.png';
        }
        
        console.log('Desktop logo - Original:', originalSrc, 'Hover:', hoverSrc);
        
        logoImg.addEventListener('mouseenter', function() {
            console.log('Desktop logo hover - changing to:', hoverSrc);
            this.src = hoverSrc;
        });
        
        logoImg.addEventListener('mouseleave', function() {
            // Only change back to original if header is not solid
            const header = document.querySelector('.header');
            if (!header || !header.classList.contains('header-solid')) {
                this.src = originalSrc;
            }
        });
        
        // Add click event to navigate to home
        logoImg.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Mobile logo - static display only (no hover, no link)
    if (mobileLogoImg) {
        // Always show fioresque wit.png in mobile menu
        mobileLogoImg.src = 'images/fioresque wit.png';
        
        // Remove any existing event listeners by cloning the element
        const newMobileLogoImg = mobileLogoImg.cloneNode(true);
        mobileLogoImg.parentNode.replaceChild(newMobileLogoImg, mobileLogoImg);
    }
}

// Logo hover effect is now called from setupEventListeners()

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

// Mobile menu functions
function toggleMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburgerMenu && mobileMenu) {
        const isActive = hamburgerMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            hamburgerMenu.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Shop dropdown functions
function toggleShopDropdown() {
    const shopToggle = document.getElementById('shopToggle');
    const shopDropdown = document.getElementById('shopDropdown');
    
    if (shopToggle && shopDropdown) {
        const isActive = shopToggle.classList.contains('active');
        
        if (isActive) {
            shopToggle.classList.remove('active');
            shopDropdown.classList.remove('active');
        } else {
            shopToggle.classList.add('active');
            shopDropdown.classList.add('active');
        }
    }
} 

// Header background on scroll (responsive en robuust)
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const logoImg = document.getElementById('logoImg');
    const mobileLogoImg = document.querySelector('.mobile-logo-img');
    
    // Check if we're on the home page or other pages
    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
    const isProductsPage = window.location.pathname.includes('products.html') || window.location.pathname.includes('product-detail.html');
    
    if (!header) return;
    if (!hero) {
        header.classList.add('header-solid');
        // Only change logo on home page, not on products/product-detail pages
        if (isHomePage && !isProductsPage) {
            if (logoImg) logoImg.src = 'images/fioresque wit.png';
            if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque wit.png';
        } else if (!isHomePage && !isProductsPage) {
            if (logoImg) logoImg.src = 'images/fioresque bloem wit.png';
            if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque bloem wit.png';
        }
        return;
    }
    
    const heroRect = hero.getBoundingClientRect();
    const isMobile = window.innerWidth <= 600;
    const isHeaderSolid = header.classList.contains('header-solid');
    
    if (isMobile) {
        // Op mobiel: zodra je 30% van het GIF voorbij bent
        const trigger = heroRect.height * 0.3;
        if (heroRect.bottom <= window.innerHeight - trigger) {
            if (!isHeaderSolid) {
                header.classList.add('header-solid');
                // Only change logo on home page, not on products/product-detail pages
                if (isHomePage && !isProductsPage) {
                    if (logoImg) logoImg.src = 'images/fioresque wit.png';
                    if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque wit.png';
                } else if (!isHomePage && !isProductsPage) {
                    if (logoImg) logoImg.src = 'images/fioresque bloem wit.png';
                    if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque bloem wit.png';
                }
            }
        } else {
            if (isHeaderSolid) {
                header.classList.remove('header-solid');
                // Only change logo on home page, not on products/product-detail pages
                if (isHomePage && !isProductsPage) {
                    if (logoImg) logoImg.src = 'images/fioresque bloem wit.png';
                    if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque bloem wit.png';
                } else if (!isHomePage && !isProductsPage) {
                    if (logoImg) logoImg.src = 'images/fioresque wit.png';
                    if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque wit.png';
                }
            }
        }
    } else {
        // Op desktop: pas als je helemaal voorbij het GIF bent
        if (heroRect.bottom <= 0) {
            if (!isHeaderSolid) {
                header.classList.add('header-solid');
                // Only change logo on home page, not on products/product-detail pages
                if (isHomePage && !isProductsPage) {
                    if (logoImg) logoImg.src = 'images/fioresque wit.png';
                    if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque wit.png';
                } else if (!isHomePage && !isProductsPage) {
                    if (logoImg) logoImg.src = 'images/fioresque bloem wit.png';
                    if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque bloem wit.png';
                }
            }
        } else {
            if (isHeaderSolid) {
                header.classList.remove('header-solid');
                // Only change logo on home page, not on products/product-detail pages
                if (isHomePage && !isProductsPage) {
                    if (logoImg) logoImg.src = 'images/fioresque bloem wit.png';
                    if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque bloem wit.png';
                } else if (!isHomePage && !isProductsPage) {
                    if (logoImg) logoImg.src = 'images/fioresque wit.png';
                    if (mobileLogoImg) mobileLogoImg.src = 'images/fioresque wit.png';
                }
            }
        }
    }
}); 