// Mock product data
const products = [
    { id: 1, name: 'Porsche 911 Dakar', price: 25000000000, img: 'Porsche 911 Dakar.jpeg' },
    { id: 2, name: 'Porsche 911 Pink', price: 1500000000, img: 'Porsche 911 Pink.jpeg' }
];

// Initialize an empty cart
let cart = [];

// Select the cart items container, total price element, and cart count element
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-count');

// Function to render the cart
function renderCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Price: Ksh. ${item.price.toLocaleString()}</p>
                <label for="quantity-${item.id}">Quantity:</label>
                <input type="number" id="quantity-${item.id}" name="quantity" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotal();
    updateCartCount();
}

// Function to update the total price
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = total.toLocaleString();
}

// Function to update the cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = count;
}

// Function to add an item to the cart
function addItem(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }
}

// Function to remove an item from the cart
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Function to update the quantity of an item in the cart
function updateQuantity(id, quantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        renderCart();
    }
}

// Event listeners for add to cart buttons
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        const id = parseInt(button.dataset.id);
        addItem(id);
    });
});

// Event listeners for remove and quantity change buttons
cartItemsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('remove-btn')) {
        const id = parseInt(event.target.dataset.id);
        removeItem(id);
    }
});

cartItemsContainer.addEventListener('input', event => {
    if (event.target.classList.contains('quantity-input')) {
        const id = parseInt(event.target.dataset.id);
        const quantity = parseInt(event.target.value);
        if (!isNaN(quantity) && quantity > 0) {
            updateQuantity(id, quantity);
        }
    }
});

// Initial render of the cart
renderCart();
