// cart.js
// 1. Get items from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 2. Add to cart function
function addToCart(button) {
    const title = button.getAttribute('data-title');
    const price = parseFloat(button.getAttribute('data-price'));
    const existingItem = cart.find(item => item.name === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: title, name: title, price: price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Added to cart!');
}

// 3. Update cart count function
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = `(${count})`;
    }
}

// 4. Render items function
function renderCart() {
    let cartItems = document.getElementById('cart-items');
    if (!cartItems) return; // If not on cart page, skip
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQty('${item.id}', this.value)">
                <span>$${ (item.price * item.quantity).toFixed(2) }</span>
                <button onclick="removeItem('${item.id}')">Remove</button>
            </div>
        `;
    });
    document.getElementById('total-price').innerText = total.toFixed(2);
    updateCartCount();
}

// 4. Update quantity function
function updateQty(id, qty) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = parseInt(qty);
        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }
}

// 5. Remove item function
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// 6. Attach event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.add-book-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            addToCart(this);
        });
    });
    renderCart();
    updateCartCount();
});