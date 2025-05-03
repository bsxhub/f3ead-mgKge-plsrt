document.addEventListener('DOMContentLoaded', function() {
  // Toggle menu for mobile view
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  if (menuToggle) {
      menuToggle.addEventListener('click', function() {
          menu.classList.toggle('active');
      });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerHeight = document.querySelector('header').offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
              
              // Close mobile menu after clicking
              if (menu.classList.contains('active')) {
                  menu.classList.remove('active');
              }
          }
      });
  });
  
  // Product filtering
  const categoryButtons = document.querySelectorAll('.category-btn');
  const productContainer = document.getElementById('productContainer');
  
  if (categoryButtons.length > 0 && productContainer) {
      categoryButtons.forEach(button => {
          button.addEventListener('click', function() {
              // Remove active class from all buttons
              categoryButtons.forEach(btn => btn.classList.remove('active'));
              
              // Add active class to clicked button
              this.classList.add('active');
              
              // Filter products
              const category = this.getAttribute('data-category');
              filterProducts(category);
          });
      });
      
      // Load products from JSON
      fetchProducts();
  }
  
  // Initialize testimonial slider
  initTestimonialSlider();
  
  // Form submission handler
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
      inquiryForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Collect form data
          const formData = {
              name: document.getElementById('name').value,
              phone: document.getElementById('phone').value,
              email: document.getElementById('email').value,
              product: document.getElementById('product').value,
              message: document.getElementById('message').value
          };
          
          // Here you would typically send this data to a server
          // For demonstration, we'll just show an alert
          alert('Terima kasih ' + formData.name + '! Pertanyaan anda telah dihantar. Saya akan menghubungi anda melalui nombor ' + formData.phone + ' secepat mungkin.');
            
            // Reset form after submission
            inquiryForm.reset();
        });
    }
});

// Fetch products from JSON file
function fetchProducts() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            // Store data globally for filtering
            window.productsData = data.products;
            window.promotionsData = data.promotions;
            
            // Display all products initially
            displayProducts('all');
            
            // Display promotions
            displayPromotions();
        })
        .catch(error => {
            console.error('Error loading product data:', error);
            document.getElementById('productContainer').innerHTML = '<p class="error-message">Maaf, produk tidak dapat dimuat. Sila cuba sebentar lagi.</p>';
            document.getElementById('promotionContainer').innerHTML = '<p class="error-message">Maaf, promosi tidak dapat dimuat. Sila cuba sebentar lagi.</p>';
        });
}

// Display products based on category
function displayProducts(products) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-tag">${getCategoryLabel(product.category)}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <div class="monthly">RM${product.monthlyPrice}/bulan</div>
                    <div class="cash">Tunai: RM${product.cashPrice}</div>
                </div>
                <div class="product-actions">
                    <a href="https://wa.me/60123456789?text=Saya%20berminat%20dengan%20${encodeURIComponent(product.name)}%20Coway" class="btn-secondary"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    <a href="#hubungi" class="btn-primary">Pertanyaan</a>
                </div>
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });
}

// Filter products based on category
function filterProducts(category) {
    if (!window.productsData) return;
    
    let filteredProducts;
    
    if (category === 'all') {
        filteredProducts = window.productsData;
    } else {
        filteredProducts = window.productsData.filter(product => product.category === category);
    }
    
    displayProducts(filteredProducts);
}

// Display promotions from JSON data
function displayPromotions() {
    if (!window.promotionsData) return;
    
    const promotionContainer = document.getElementById('promotionContainer');
    if (!promotionContainer) return;
    
    promotionContainer.innerHTML = '';
    
    window.promotionsData.forEach(promo => {
        const promoCard = document.createElement('div');
        promoCard.className = 'promotion-card';
        
        promoCard.innerHTML = `
            <div class="promotion-image">
                <img src="${promo.image}" alt="${promo.title}">
            </div>
            <div class="promotion-info">
                <h3 class="promotion-title">${promo.title}</h3>
                <span class="promotion-period">${promo.period}</span>
                <p class="promotion-description">${promo.description}</p>
                <a href="https://wa.me/60123456789?text=Saya%20berminat%20dengan%20promosi%20${encodeURIComponent(promo.title)}" class="promotion-action">Dapatkan Promosi Ini</a>
            </div>
        `;
        
        promotionContainer.appendChild(promoCard);
    });
}

// Get category label from category code
function getCategoryLabel(category) {
    const labels = {
        'water': 'Penapis Air',
        'air': 'Penapis Udara',
        'bidet': 'Bidet',
        'other': 'Lain-lain'
    };
    
    return labels[category] || 'Produk Coway';
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Auto scroll testimoni (optional)
    let scrollInterval;
    
    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            slider.scrollLeft += 2; // Scroll speed
            
            // Reset scroll position when reached the end
            if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth)) {
                slider.scrollLeft = 0;
            }
        }, 30); // Interval speed
    }
    
    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }
    
    // Start auto-scroll after 2 seconds
    setTimeout(startAutoScroll, 2000);
    
    // Stop auto-scroll when mouse enters slider
    slider.addEventListener('mouseenter', stopAutoScroll);
    
    // Resume auto-scroll when mouse leaves slider
    slider.addEventListener('mouseleave', startAutoScroll);
}

// Activate relevant menu item based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.menu a').forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + sectionId) {
                    item.classList.add('active');
                }
            });
        }
    });
});