// Data produk Coway
const productsData = [
    {
        "category": "Water Purifier",
        "nama": "VILLAEM 3 GRAY",
        "id-id": "(CHP-7320L)",
        "hargabulan": "RM125.00",
        "hargacash": "RM4,800.00",
        "gambar-src": "https://emall.coway.com.my/ProductImages/7878b773-9722-47d1-a107-f8c001ff0b4f/1/240x240/villaem-3-gray.png"
    },
    {
        "category": "Water Purifier",
        "nama": "VILLAEM 3 WHITE",
        "id-id": "(CHP-7320W)",
        "hargabulan": "RM125.00",
        "hargacash": "RM4,800.00",
        "gambar-src": "https://emall.coway.com.my/ProductImages/7878b773-9722-47d1-a107-f8c001ff0b4f/1/240x240/villaem-3-white.png"
    },
    {
        "category": "Water Purifier",
        "nama": "VILLAEM 2 GRAY",
        "id-id": "(CHP-6320L)",
        "hargabulan": "RM115.00",
        "hargacash": "RM4,400.00",
        "gambar-src": "https://emall.coway.com.my/ProductImages/7878b773-9722-47d1-a107-f8c001ff0b4f/1/240x240/villaem-2-gray.png"
    },
    {
        "category": "Water Purifier",
        "nama": "VILLAEM 2 WHITE",
        "id-id": "(CHP-6320W)",
        "hargabulan": "RM115.00",
        "hargacash": "RM4,400.00",
        "gambar-src": "https://emall.coway.com.my/ProductImages/7878b773-9722-47d1-a107-f8c001ff0b4f/1/240x240/villaem-2-white.png"
    },
    {
        "category": "Water Purifier",
        "nama": "PIOU PIU",
        "id-id": "(CHP-06AR)",
        "hargabulan": "RM75.00",
        "hargacash": "RM2,880.00",
        "gambar-src": "https://emall.coway.com.my/ProductImages/7878b773-9722-47d1-a107-f8c001ff0b4f/1/240x240/piou-piu.png"
    },
    {
        "category": "Water Purifier",
        "nama": "CHAMPION NEO",
        "id-id": "(CHP-262N)",
        "hargabulan": "RM85.00",
        "hargacash": "RM3,280.00",
        "gambar-src": "https://emall.coway.com.my/ProductImages/7878b773-9722-47d1-a107-f8c001ff0b4f/1/240x240/champion-neo.png"
    }
];

// Fungsi untuk memuat produk
function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    
    productsData.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product['gambar-src']}" alt="${product.nama}">
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.nama}</h3>
                <p class="product-model">${product['id-id']}</p>
                <div class="product-price">
                    <p class="price-monthly">Dari ${product.hargabulan}/bulan</p>
                    <p class="price-cash">${product.hargacash}</p>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary">Beli Sekarang</button>
                    <button class="btn btn-outline">Maklumat Lanjut</button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

// Fungsi untuk toggle mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Event listener ketika DOM sudah dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupMobileMenu();
    
    // Smooth scrolling untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Animasi scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
});