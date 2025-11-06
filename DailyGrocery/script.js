// Select Elements 
const cart = document.getElementById("cart");
const cartToggle = document.getElementById("cart-toggle");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const buyButtons = document.querySelectorAll("button.bg-blue-600");

//  Cart Data 
let items = [];

// Toggle Cart Visibility 
cartToggle.addEventListener("click", () => {
  cart.classList.toggle("hidden");
});

//  Close Cart Button 
closeCart.addEventListener("click", () => {
  cart.classList.add("hidden");
});

// Add to Cart Function
buyButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest("div"); // the product card
    const name = card.querySelector("h4").textContent;
    const priceText = card.querySelector("p.font-bold").textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    const imgSrc = card.querySelector("img").src;

    addItemToCart(name, price, imgSrc);
  });
});

// Add Item Logic
function addItemToCart(name, price, imgSrc) {
  const existingItem = items.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({ name, price, quantity: 1, imgSrc });
  }

  updateCart();
  cart.classList.remove("hidden"); // show cart when item added
}

// Update Cart UI 
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  items.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.classList.add("flex", "items-center", "justify-between", "bg-gray-50", "p-2", "rounded", "shadow-sm");

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="${item.imgSrc}" class="w-10 h-10 rounded object-cover" alt="${item.name}">
        <div>
          <p class="font-semibold">${item.name}</p>
          <p class="text-sm text-gray-600">$${item.price} × ${item.quantity}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="changeQuantity(${index}, -1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
        <button onclick="changeQuantity(${index}, 1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
        <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700 text-lg">&times;</button>
      </div>
    `;

    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Quantity Controls 
function changeQuantity(index, delta) {
  items[index].quantity += delta;
  if (items[index].quantity <= 0) {
    items.splice(index, 1);
  }
  updateCart();
}

// Remove Single Item 
function removeItem(index) {
  items.splice(index, 1);
  updateCart();
}

//  Clear Cart 
function clearCart() {
  items = [];
  updateCart();
}
