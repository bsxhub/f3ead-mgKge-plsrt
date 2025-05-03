document.addEventListener('DOMContentLoaded', function() {
    // Price toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const priceDisplays = document.querySelectorAll('.price-display');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all price displays
            priceDisplays.forEach(display => display.classList.remove('active'));
            
            // Show the corresponding price display
            const option = this.getAttribute('data-option');
            document.querySelector(`.price-display.${option}`).classList.add('active');
        });
    });

    // Product thumbnails functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image source
            const imageSrc = this.getAttribute('data-image');
            mainImage.src = imageSrc;
            
            // Add a slight zoom animation
            mainImage.style.transform = 'scale(1.05)';
            setTimeout(() => {
                mainImage.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    let isMenuOpen = false;

    menuToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // Create mobile menu
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = navLinks.innerHTML;
            
            // Style mobile menu
            mobileMenu.style.position = 'fixed';
            mobileMenu.style.top = '44px';
            mobileMenu.style.left = '0';
            mobileMenu.style.width = '100%';
            mobileMenu.style.backgroundColor = 'var(--white)';
            mobileMenu.style.padding = '20px';
            mobileMenu.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            mobileMenu.style.zIndex = '99';
            mobileMenu.style.animation = 'fadeIn 0.3s ease';
            
            // Style menu items
            const menuItems = mobileMenu.querySelectorAll('li');
            menuItems.forEach(item => {
                item.style.margin = '16px 0';
                item.style.fontSize = '1rem';
            });
            
            // Append to body
            document.body.appendChild(mobileMenu);
            
            // Animate toggle button
            menuToggle.querySelector('span:first-child').style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuToggle.querySelector('span:last-child').style.transform = 'rotate(-45deg) translate(1px, -1px)';
        } else {
            // Remove mobile menu
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    mobileMenu.remove();
                }, 300);
            }
            
            // Reset toggle button
            menuToggle.querySelector('span:first-child').style.transform = 'none';
            menuToggle.querySelector('span:last-child').style.transform = 'none';
        }
    });

    // Add to cart animation
    const addToCartBtn = document.querySelector('.btn-primary');
    const cartIcon = document.querySelector('.cart-icon');

    addToCartBtn.addEventListener('click', function() {
        // Create a "flyToCart" element
        const flyToCart = document.createElement('div');
        flyToCart.className = 'fly-to-cart';
        
        // Position it over the product image
        const productImage = document.querySelector('.product-image');
        const rect = productImage.getBoundingClientRect();
        
        flyToCart.style.position = 'fixed';
        flyToCart.style.left = `${rect.left + rect.width / 2}px`;
        flyToCart.style.top = `${rect.top + rect.height / 2}px`;
        flyToCart.style.width = '20px';
        flyToCart.style.height = '20px';
        flyToCart.style.backgroundColor = 'var(--primary-color)';
        flyToCart.style.borderRadius = '50%';
        flyToCart.style.zIndex = '1000';
        flyToCart.style.transition = 'all 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
        
        document.body.appendChild(flyToCart);
        
        // Get cart icon position
        const cartRect = cartIcon.getBoundingClientRect();
        
        // Animate to cart
        setTimeout(() => {
            flyToCart.style.left = `${cartRect.left + cartRect.width / 2}px`;
            flyToCart.style.top = `${cartRect.top + cartRect.height / 2}px`;
            flyToCart.style.opacity = '0.8';
            flyToCart.style.transform = 'scale(0.5)';
        }, 10);
        
        // Add cart animation
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
                flyToCart.remove();
            }, 300);
        }, 600);
        
        // Change button text temporarily
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Added to Cart';
        addToCartBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.style.backgroundColor = 'var(--primary-color)';
        }, 2000);
    });

    // Intersection Observer for fade in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each feature
    document.querySelectorAll('.feature').forEach(feature => {
        feature.style.opacity = "0";
        feature.style.transform = "translateY(20px)";
        feature.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(feature);
    });

    // Add the visible class style
    const style = document.createElement('style');
    style.textContent = `
        .feature.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Initialize product data from JSON
    // Note: In a real app, this would likely come from an API
    const productData = {
        "category": "Water Purifier",
        "nama": "VILLAEM 3 GRAY",
        "id-id": "(CHP-7320L)",
        "hargabulan": "RM125.00",
        "hargacash": "RM4,800.00",
        "gambar-src": "https://emall.coway.com.my/ProductImages/7878b773-9722-47d1-a107-f8c001ff0b4f/1/240x240/villaem-3-gray.png"
    };

    // This would be useful if we were loading multiple products dynamically
    function updateProductInfo(data) {
        document.querySelector('.product-category').textContent = data.category;
        document.querySelector('.product-title').textContent = data.nama;
        document.querySelector('.product-id span').textContent = data["id-id"];
        document.querySelector('.price-display.rental .price').innerHTML = data.hargabulan + '<span>/month</span>';
        document.querySelector('.price-display.purchase .price').textContent = data.hargacash;
        document.getElementById('main-product-image').src = data["gambar-src"];
        
        // Update thumbnails too
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.setAttribute('data-image', data["gambar-src"]);
            thumb.querySelector('img').src = data["gambar-src"];
        });
    }

    // Uncomment this if you want to initialize from the JSON data
    // updateProductInfo(productData);
});