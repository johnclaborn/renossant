const priceTable = {
  "Renossant Creator Tee": {
    XS: 44,
    S: 44,
    M: 44,
    L: 44,
    XL: 44,
    "2XL": 46,
    "3XL": 48,
    "4XL": 50
  },
  "Renossant Freestyle Tank": {
    XS: 45,
    S: 45,
    M: 45,
    L: 45,
    XL: 45,
  },
  "RIFTA Shirt": {
    XS: 44,
    S: 44,
    M: 44,
    L: 44,
    XL: 44,
    "2XL": 46,
    "3XL": 48,
    "4XL": 50
  },
  "The Huckleberry Show Lawmans Shirt": {
    XS: 44,
    S: 44,
    M: 44,
    L: 44,
    XL: 44,
    "2XL": 46,
    "3XL": 48,
    "4XL": 50
  },
  "Renossant Creative Cap": {
    Black: 50,
    Silver: 50,
    Red: 50,
  },
  "Renossant Builders Beanie": {
    Black: 45,
    White: 45,
    Blue: 45,
    Red: 45,
  },
  "RIFTA Coffee Mug": {
    default: 17
  },
  "The Huckleberry Show Mug": {
    default: 17
  }
};

let total = 0;
let cartItems = [];

function addToCart(name) {
  const container = event.target.closest(".item");
  const selects = container.querySelectorAll("select");
  const values = Array.from(selects).map(s => s.value);

  if (values.includes("")) {
    alert("Please make all selections.");
    return;
  }

  const size = values[0];
  const price = priceTable[name]?.[size || "default"] ?? passedPrice ?? 0;

  const description = `${name} — ${values.join(", ")}`;
  const existing = cartItems.find(i => i.description === description);

  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({ description, price, quantity: 1 });
  }

  total += price;
  updateCart();
  showPopup();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = cartItems
    .map(item => `<li>${item.description} — $${item.price} x${item.quantity}</li>`)
    .join('');
  document.getElementById("total").innerText = total;
  document.getElementById("cashapp-instructions").style.display = cartItems.length ? 'block' : 'none';
}

function clearCart() {
  cartItems = [];
  total = 0;
  updateCart();
}

function showPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(() => popup.style.display = "none", 1800);
}

function sendToGoogleForm() {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const cartList = cartItems
    .map(item => `${item.description} — $${item.price} x${item.quantity}`)
    .join('\n');
  const totalText = "Total: $" + total;
  const fullOrder = encodeURIComponent(`${cartList}\n${totalText}`);

  const baseURL = "https://docs.google.com/forms/d/e/1FAIpQLSdp5uXMBPtEP8dqF9DUV1zl6zKsetwEbseeicAFpnaPB_P_FQ/viewform";
  const orderFieldID = "entry.1269873545";
  const formURL = `${baseURL}?${orderFieldID}=${fullOrder}`;
  window.location.href = formURL;
}

document.querySelectorAll(".size-select").forEach(select => {
  select.addEventListener("change", e => {
    const name = e.target.dataset.item;
    const size = e.target.value;
    const price = priceTable[name]?.[size] ?? 0;
    const container = e.target.closest(".item");
    container.querySelector(".price-display").innerText = price;
  });
});