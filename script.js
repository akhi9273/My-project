// Expanded Dummy Product Database (12 Items)
const products = [
    { id: 3, title: "Minimalist Leather Men's Chronograph Watch", price: 4500, rating: "4.2 ★", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
    { id: 4, title: "Premium Ergonomic Breathable Running Shoes", price: 6200, rating: "4.3 ★", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { id: 5, title: "Ultra-wide 4K Curved Gaming Monitor 32\"", price: 34999, rating: "4.6 ★", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
    { id: 6, title: "Mechanical RGB Backlit Gaming Keyboard", price: 3200, rating: "4.1 ★", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
    { id: 7, title: "Professional DSLR Camera with 18-55mm Lens Kit", price: 54999, rating: "4.8 ★", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" },
    { id: 8, title: "Smart Fitness Watch with Heart Rate Monitor", price: 2999, rating: "4.0 ★", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400" },
    { id: 9, title: "Vintage Leather Travel Backpack (Waterproof)", price: 3799, rating: "4.4 ★", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
    { id: 10, title: "Modern Ceramic Succulent Plant Pots (Set of 3)", price: 1250, rating: "4.6 ★", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" },
    { id: 11, title: "Compact Automatic Espresso Coffee Machine", price: 15499, rating: "4.3 ★", image: "https://images.unsplash.com/photo-1517914309069-b5a03bc55140?w=400" },
    { id: 12, title: "Ergonomic High-Back Office Mesh Chair", price: 8999, rating: "4.5 ★", image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=400" }
];

let cart = [];

// Function to render products inside the grid
function renderProducts(productsToDisplay) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = ''; // Clear existing items

    if(productsToDisplay.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 50px; color: #666;">No products match your search.</p>`;
        return;
    }

    productsToDisplay.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div>
                <div class="product-title" title="${product.title}">${product.title}</div>
                <span class="product-rating">${product.rating}</span>
                <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
            </div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        grid.appendChild(card);
    });

    // Add event listeners to the dynamically created "Add to Cart" buttons
    const addButtons = card.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

// Search feature logic
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Add to Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

// Toggle Sidebar Cart Visibility
function toggleCart(open) {
    const sidebar = document.getElementById('cartSidebar');
    if (open) {
        sidebar.classList.add('active');
    } else {
        sidebar.classList.remove('active');
    }
}

// Update the Cart counter, Items view list and Grand Total
function updateCartUI() {
    // Update counter badge
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;

    // Render items in sidebar
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    let grandTotal = 0;

    cart.forEach(item => {
        grandTotal += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <small>₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</small>
            </div>
            <strong>₹${(item.price * item.quantity).toLocaleString('en-IN')}</strong>
        `;
        cartItemsContainer.appendChild(div);
    });

    document.getElementById('cartTotalAmount').innerText = grandTotal.toLocaleString('en-IN');
}

// Checkout Button trigger
function checkout() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order placed successfully! Thank you for shopping with dummy Flipkart.");
    cart = [];
    updateCartUI();
    toggleCart(false);
}

// --- Event Listeners ---

// Search button click
document.getElementById('searchBtn').addEventListener('click', searchProducts);

// Realtime Search listener (allows pressing 'Enter')
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Open and Close Cart Sidebar
document.getElementById('cartBtn').addEventListener('click', () => toggleCart(true));
document.getElementById('closeCartBtn').addEventListener('click', () => toggleCart(false));

// Checkout button click
document.getElementById('checkoutBtn').addEventListener('click', checkout);

// Global event delegation for "Add to Cart" since buttons are generated dynamically
document.getElementById('productGrid').addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        addToCart(id);
    }
});

// Initialize App on load
renderProducts(products);