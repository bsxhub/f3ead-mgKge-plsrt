// Load data dari JSON
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
    // 1. Tampilkan slider promo
    const slider = document.getElementById('promo-slider');
    data.promo_slides.forEach((slide, index) => {
      slider.innerHTML += `
        <div class="slide" style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/${slide.image}')">
          <h2>${slide.title}</h2>
          <p>${slide.description}</p>
        </div>
      `;
    });

    // 2. Tampilkan kategori
    const categories = [...new Set(data.products.map(p => p.category))];
    const categoryDiv = document.getElementById('product-categories');
    categories.forEach(cat => {
      categoryDiv.innerHTML += `
        <button class="category-btn" onclick="filterProducts('${cat}')">${cat}</button>
      `;
    });

    // 3. Tampilkan semua produk
    renderProducts(data.products);
  });

// Fungsi render produk
function renderProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  
  products.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="images/${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>RM ${product.price.toLocaleString()}</p>
        <p class="promo">${product.promo || ''}</p>
        <a href="${product.whatsapp_link || 'https://wa.me/60123456789?text=Saya%20minat%20' + product.name}" 
           class="whatsapp-btn">
           Order Sekarang
        </a>
      </div>
    `;
  });
}

// Filter produk
function filterProducts(category) {
  fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
      const filtered = data.products.filter(p => p.category === category);
      renderProducts(filtered);
    });
}