const products = document.querySelectorAll(".product");
const cartItemsContainer = document.querySelector(".cart-items");
const totalDisplay = document.querySelector(".total");

// Cart object to track items
const cart = {};

// Function to update the cart display
function updateCartDisplay() {
  // Clear existing cart items
  cartItemsContainer.innerHTML = "";

  // If cart is empty, show "No Product added to the cart"
  if (Object.keys(cart).length === 0) {
    cartItemsContainer.innerHTML = '<div class="no-product">No Product added to the cart</div>';
    totalDisplay.textContent = "Total: 0";
    return;
  }

  // Otherwise, display cart items
  let total = 0;
  for (let key in cart) {
    const item = cart[key];
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.textContent = `${item.name} × ${item.quantity} = ₹${itemTotal}`;
    cartItemsContainer.appendChild(cartItem);
  }

  // Update total price
  totalDisplay.textContent = `Total: ₹${total}`;
}

// Function to handle increment and decrement
function updateProductQuantity(productElement, isIncrement) {
  const name = productElement.dataset.name;
  const price = parseInt(productElement.dataset.price);
  const quantityElement = productElement.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);

  if (isIncrement) {
    quantity++;
    cart[name] = { name, price, quantity };
  } else {
    if (quantity > 0) {
      quantity--;
      if (quantity === 0) {
        delete cart[name];
      } else {
        cart[name].quantity = quantity;
      }
    }
  }

  quantityElement.textContent = quantity;
  updateCartDisplay();
}

// Add event listeners for increment and decrement buttons
products.forEach((product) => {
  const incrementBtn = product.querySelector(".increment");
  const decrementBtn = product.querySelector(".decrement");

  incrementBtn.addEventListener("click", () => updateProductQuantity(product, true));
  decrementBtn.addEventListener("click", () => updateProductQuantity(product, false));
});

// Initialize cart display
updateCartDisplay();
