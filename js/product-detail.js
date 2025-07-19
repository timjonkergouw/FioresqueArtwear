// Product data (same as in products.js)
// To add more images to a product, simply add more image paths to the images array
// Example:
// images: [
//     "images/product-front.png",
//     "images/product-back.png", 
//     "images/product-detail-1.png",
//     "images/product-detail-2.png",
//     "images/product-detail-3.png",
//     "images/product-detail-4.png"
// ]
const products = [
    {
        id: 1,
        name: "Logo Tee White",
        price: 40.00,
        category: "shirts",
        images: [
            "images/white tee logo front.png",
            "images/white tee logo back.png",
            "images/fioresque tee logo wit achterkant desisgn.png", // Additional detail image
            "images/fioresque tee logo wit voorkant desisgn.png" ,
            "images/fioresque logo tee wit met model.png" ,
        ],
        description: "A classic white t-shirt featuring the iconic Fioresque logo design. This timeless piece combines minimalist elegance with premium comfort, making it perfect for everyday wear. The clean white background showcases the distinctive Fioresque branding, creating a sophisticated yet casual look that effortlessly transitions from day to evening.",
        material: "100% Cotton",
        careInstructions: "Machine wash at 30°C, do not bleach",
        origin: "Made in Netherlands"
    },
    {
        id: 2,
        name: "Logo Tee Black",
        price: 40.00,
        category: "shirts",
        images: [
            "images/logo tee zwart voorkant.png",
            "images/logo tee zwart achterkant.png",
            "images/fioresque tee zwart voorkant design.png", // Additional detail image
            "images/fioresque tee zwart achterkant design.png"  // Additional detail image
        ],
        description: "A tropical shirt with vibrant colors and an exotic design. Perfect for summer days and vacation vibes.",
        material: "100% Cotton",
        careInstructions: "Machine wash at 30°C, do not bleach",
        origin: "Made in Netherlands"
    },
    {
        id: 3,
        name: "Fioresque Blurry Tee",
        price: 40.00,
        category: "shirts",
        images: [
            "images/fioresque blurry voorkant.png",
            "images/fioresque blurry achterkant.png",
            "images/fioresque blurry voorkant design.png", // Additional detail image
            "images/fioresque blurry achterkant design.png",
            "images/fioresque blurry tee model.png"  // Additional detail image
        ],
        description: "An elegant shirt with a vase design that combines art and fashion. Unique and stylish for any occasion.",
        material: "100% Cotton",
        careInstructions: "Machine wash at 30°C, do not bleach",
        origin: "Made in Netherlands"
    },
    {
        id: 4,
        name: "logo hoodie black",
        price: 40.00,
        category: "hoodies",
        images: [
            "images/logo hoodie zwart voorkant.png",
            "images/logo hoodie zwart achterkant.png",
            "images/fioresque tee zwart voorkant design.png", // Additional detail image
            "images/fioresque tee zwart achterkant design.png",
            "images/fioresque logo hoodie zwart model.png"  // Additional detail image
        ],
        description: "A beautiful shirt with a flower house design that combines nature and architecture. Perfect for the Fioresque collection.",
        material: "100% Cotton",
        careInstructions: "Machine wash at 30°C, do not bleach",
        origin: "Made in Netherlands"
    }
];

// Global variables
let currentProduct = null;
let selectedSize = null;
let currentImageIndex = 0;
let productImages = [];
let slideshowInterval = null;
let isSlideshowActive = false; // Disabled automatic slideshow

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
const thumbnailContainer = document.getElementById('thumbnailContainer');

// Image navigation elements
const prevImageBtn = document.getElementById('prevImageBtn');
const nextImageBtn = document.getElementById('nextImageBtn');
const imageDots = document.getElementById('imageDots');

// Popup elements
const imagePopup = document.getElementById('imagePopup');
const popupImage = document.getElementById('popupImage');
const popupThumbnails = document.getElementById('popupThumbnails');
const closePopup = document.getElementById('closePopup');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initialize product detail page
document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
    setupEventListeners();
    updateAddToCartButton();
    
    // Ensure hamburger menu functionality is working
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburgerMenu && mobileMenu) {
        // Remove any existing event listeners
        const newHamburgerMenu = hamburgerMenu.cloneNode(true);
        hamburgerMenu.parentNode.replaceChild(newHamburgerMenu, hamburgerMenu);
        
        // Add hamburger menu functionality
        newHamburgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on links
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
    }
});

// Mobile menu functions (if not already defined in script.js)
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

// Clean up slideshow when page is unloaded
window.addEventListener('beforeunload', function() {
    stopSlideshow();
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
    
    // Set up product images array
    productImages = currentProduct.images;
    
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
    mainImage.src = productImages[0]; // Display the first image as main
    mainImage.alt = `${currentProduct.name} Front`;
    
    // Set thumbnails
    const thumbnailImages = currentProduct.images;
    
    thumbnailContainer.innerHTML = ''; // Clear existing thumbnails
    thumbnailImages.forEach((imageSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imageSrc;
        thumbnail.alt = `${currentProduct.name} Thumbnail ${index + 1}`;
        thumbnail.className = 'thumbnail';
        thumbnail.setAttribute('data-image', imageSrc);
        thumbnail.setAttribute('data-index', index);
        
        // Mark first thumbnail as active
        if (index === 0) {
            thumbnail.classList.add('active');
        }
        
        thumbnailContainer.appendChild(thumbnail);
    });
    
    // Setup thumbnail event listeners after thumbnails are created
    setupThumbnailEvents();
    
    // Setup image navigation event listeners
    setupImageNavigationEvents();
    
    // Setup dot indicators
    setupDotIndicators();
    
    // Slideshow disabled - removed automatic slideshow
    
    // Update page title
    document.title = `${currentProduct.name} - Fioresque`;
}

// Setup thumbnail event listeners
function setupThumbnailEvents() {
    thumbnailContainer.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imageIndex = parseInt(this.getAttribute('data-index'));
            const direction = imageIndex > currentImageIndex ? 'right' : 'left';
            currentImageIndex = imageIndex;
            updateMainImage(direction);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Main image click event for popup
    mainImage.addEventListener('click', function() {
        openImagePopup(currentImageIndex); // Start with current image
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
                image: currentProduct.images[0], // Assuming the first image is the main one for cart
                quantity: 1,
                size: selectedSize
            });
        } else {
            alert('Shopping cart functionality is currently being updated. Please check back soon!');
        }
    });
    
    // Popup event listeners
    closePopup.addEventListener('click', closeImagePopup);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (imagePopup.classList.contains('active')) {
            // Popup is active, handle popup navigation
            switch(e.key) {
                case 'Escape':
                    closeImagePopup();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        } else {
            // Main image navigation
            switch(e.key) {
                case 'ArrowLeft':
                    showPreviousMainImage();
                    break;
                case 'ArrowRight':
                    showNextMainImage();
                    break;
            }
        }
    });
    
    // Close popup when clicking outside the image
    imagePopup.addEventListener('click', function(e) {
        if (e.target === imagePopup) {
            closeImagePopup();
        }
    });
}

// Setup image navigation event listeners
function setupImageNavigationEvents() {
    // Remove existing event listeners by cloning and replacing the buttons
    const newPrevBtn = prevImageBtn.cloneNode(true);
    const newNextBtn = nextImageBtn.cloneNode(true);
    prevImageBtn.parentNode.replaceChild(newPrevBtn, prevImageBtn);
    nextImageBtn.parentNode.replaceChild(newNextBtn, nextImageBtn);
    
    // Update references
    const updatedPrevBtn = document.getElementById('prevImageBtn');
    const updatedNextBtn = document.getElementById('nextImageBtn');
    
    // Add new event listeners
    updatedPrevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showPreviousMainImage();
    });
    
    updatedNextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showNextMainImage();
    });
}

// Open image popup
function openImagePopup(startIndex = 0) {
    currentImageIndex = startIndex;
    updatePopupImage();
    createPopupThumbnails();
    imagePopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close image popup
function closeImagePopup() {
    imagePopup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Update popup image
function updatePopupImage() {
    popupImage.src = productImages[currentImageIndex];
    popupImage.alt = `${currentProduct.name} Image ${currentImageIndex + 1}`;
    
    // Update active thumbnail in popup
    const popupThumbnailElements = popupThumbnails.querySelectorAll('.popup-thumbnail');
    popupThumbnailElements.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Show previous image
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    updatePopupImage();
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % productImages.length;
    updatePopupImage();
}

// Show previous main image
function showPreviousMainImage() {
    currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    updateMainImage('left');
}

// Show next main image
function showNextMainImage() {
    currentImageIndex = (currentImageIndex + 1) % productImages.length;
    updateMainImage('right');
}

// Slideshow functions
function startSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    slideshowInterval = setInterval(() => {
        if (isSlideshowActive) {
            // Direct slide animation for slideshow
            slideToNextImage();
        }
    }, 5000); // 5 seconds
}

function slideToNextImage() {
    const currentImg = mainImage;
    const nextIndex = (currentImageIndex + 1) % productImages.length;
    
    // Create a temporary image for the new content
    const tempImg = new Image();
    tempImg.src = productImages[nextIndex];
    tempImg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: #f5f5f5;
        z-index: 1;
    `;
    
    // Add sliding class to both images
    currentImg.classList.add('sliding');
    tempImg.classList.add('sliding');
    
    // Add sliding class to dots and thumbnails
    imageDots.classList.add('sliding');
    thumbnailContainer.classList.add('sliding');
    
    // Position the new image off-screen to the right
    tempImg.style.transform = 'translateX(100%)';
    
    // Move dots and thumbnails slightly to the left
    imageDots.style.transform = 'translateX(-20px)';
    thumbnailContainer.style.transform = 'translateX(-20px)';
    
    // Add the temporary image to the container
    currentImg.parentNode.appendChild(tempImg);
    
    // Force a reflow to ensure the initial position is set
    tempImg.offsetHeight;
    
    // Start both animations simultaneously
    requestAnimationFrame(() => {
        // Slide out current image and slide in new image at the same time
        currentImg.style.transform = 'translateX(-100%)';
        tempImg.style.transform = 'translateX(0)';
        
        // Move dots and thumbnails back to center
        imageDots.style.transform = 'translateX(0)';
        thumbnailContainer.style.transform = 'translateX(0)';
    });
    
    // After animation completes, update the main image and clean up
    setTimeout(() => {
        currentImageIndex = nextIndex;
        currentImg.src = productImages[currentImageIndex];
        currentImg.alt = `${currentProduct.name} Image ${currentImageIndex + 1}`;
        currentImg.style.transform = 'translateX(0)';
        currentImg.style.zIndex = '0';
        
        // Remove sliding classes
        currentImg.classList.remove('sliding');
        tempImg.classList.remove('sliding');
        imageDots.classList.remove('sliding');
        thumbnailContainer.classList.remove('sliding');
        
        // Reset transforms
        imageDots.style.transform = '';
        thumbnailContainer.style.transform = '';
        
        // Remove temporary image
        if (tempImg.parentNode) {
            tempImg.parentNode.removeChild(tempImg);
        }
        
        // Update active thumbnail
        thumbnailContainer.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
        
        // Update active dot
        imageDots.querySelectorAll('.image-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentImageIndex);
        });
    }, 550); // Slightly longer than transition time
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

function pauseSlideshow() {
    isSlideshowActive = false;
}

function resumeSlideshow() {
    isSlideshowActive = true;
}

// Enhanced updateMainImage with slide transition (for manual navigation only)
function updateMainImage(direction = 'right') {
    const currentImg = mainImage;
    
    // Create a temporary image for the new content
    const tempImg = new Image();
    tempImg.src = productImages[currentImageIndex];
    tempImg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: #f5f5f5;
        z-index: 1;
    `;
    
    // Add sliding class to both images
    currentImg.classList.add('sliding');
    tempImg.classList.add('sliding');
    
    // Add sliding class to dots and thumbnails
    imageDots.classList.add('sliding');
    thumbnailContainer.classList.add('sliding');
    
    // Position the new image off-screen based on direction
    if (direction === 'left') {
        tempImg.style.transform = 'translateX(-100%)';
        // Move dots and thumbnails in opposite direction
        imageDots.style.transform = 'translateX(20px)';
        thumbnailContainer.style.transform = 'translateX(20px)';
    } else {
        tempImg.style.transform = 'translateX(100%)';
        // Move dots and thumbnails in opposite direction
        imageDots.style.transform = 'translateX(-20px)';
        thumbnailContainer.style.transform = 'translateX(-20px)';
    }
    
    // Add the temporary image to the container
    currentImg.parentNode.appendChild(tempImg);
    
    // Force a reflow to ensure the initial position is set
    tempImg.offsetHeight;
    
    // Start both animations simultaneously
    requestAnimationFrame(() => {
        // Slide out current image and slide in new image at the same time
        if (direction === 'left') {
            currentImg.style.transform = 'translateX(100%)';
            tempImg.style.transform = 'translateX(0)';
            // Move dots and thumbnails back to center
            imageDots.style.transform = 'translateX(0)';
            thumbnailContainer.style.transform = 'translateX(0)';
        } else {
            currentImg.style.transform = 'translateX(-100%)';
            tempImg.style.transform = 'translateX(0)';
            // Move dots and thumbnails back to center
            imageDots.style.transform = 'translateX(0)';
            thumbnailContainer.style.transform = 'translateX(0)';
        }
    });
    
    // After animation completes, update the main image and clean up
    setTimeout(() => {
        currentImg.src = productImages[currentImageIndex];
        currentImg.alt = `${currentProduct.name} Image ${currentImageIndex + 1}`;
        currentImg.style.transform = 'translateX(0)';
        currentImg.style.zIndex = '0';
        
        // Remove sliding classes
        currentImg.classList.remove('sliding');
        tempImg.classList.remove('sliding');
        imageDots.classList.remove('sliding');
        thumbnailContainer.classList.remove('sliding');
        
        // Reset transforms
        imageDots.style.transform = '';
        thumbnailContainer.style.transform = '';
        
        // Remove temporary image
        if (tempImg.parentNode) {
            tempImg.parentNode.removeChild(tempImg);
        }
        
        // Update active thumbnail
        thumbnailContainer.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
        
        // Update active dot
        imageDots.querySelectorAll('.image-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentImageIndex);
        });
    }, 550); // Slightly longer than transition time
}

// Create popup thumbnails
function createPopupThumbnails() {
    popupThumbnails.innerHTML = '';
    
    productImages.forEach((imageSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imageSrc;
        thumbnail.alt = `${currentProduct.name} Thumbnail ${index + 1}`;
        thumbnail.className = 'popup-thumbnail';
        thumbnail.classList.toggle('active', index === currentImageIndex);
        
        thumbnail.addEventListener('click', function() {
            currentImageIndex = index;
            updatePopupImage();
        });
        
        popupThumbnails.appendChild(thumbnail);
    });
}

// Setup dot indicators
function setupDotIndicators() {
    imageDots.innerHTML = ''; // Clear existing dots
    productImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('image-dot');
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', function() {
            const imageIndex = parseInt(this.getAttribute('data-index'));
            const direction = imageIndex > currentImageIndex ? 'right' : 'left';
            currentImageIndex = imageIndex;
            updateMainImage(direction);
        });
        imageDots.appendChild(dot);
    });
    // Mark the current dot as active
    imageDots.querySelectorAll('.image-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
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
        const originalSrc = 'images/fioresque wit.png';
        const hoverSrc = 'images/fioresque bloem wit.png';
        
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