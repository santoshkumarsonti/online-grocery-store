/* =========================================
   FRESHCART ONLINE GROCERY STORE
   JAVASCRIPT FILE
========================================= */


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Fresh Apples",
        category: "Fruits",
        price: 120,
        emoji: "🍎"
    },

    {
        id: 2,
        name: "Bananas",
        category: "Fruits",
        price: 60,
        emoji: "🍌"
    },

    {
        id: 3,
        name: "Oranges",
        category: "Fruits",
        price: 90,
        emoji: "🍊"
    },

    {
        id: 4,
        name: "Tomatoes",
        category: "Vegetables",
        price: 40,
        emoji: "🍅"
    },

    {
        id: 5,
        name: "Broccoli",
        category: "Vegetables",
        price: 80,
        emoji: "🥦"
    },

    {
        id: 6,
        name: "Carrots",
        category: "Vegetables",
        price: 50,
        emoji: "🥕"
    },

    {
        id: 7,
        name: "Milk",
        category: "Dairy",
        price: 55,
        emoji: "🥛"
    },

    {
        id: 8,
        name: "Cheese",
        category: "Dairy",
        price: 150,
        emoji: "🧀"
    },

    {
        id: 9,
        name: "Rice",
        category: "Grains",
        price: 300,
        emoji: "🍚"
    },

    {
        id: 10,
        name: "Wheat",
        category: "Grains",
        price: 250,
        emoji: "🌾"
    },

    {
        id: 11,
        name: "Biscuits",
        category: "Snacks",
        price: 40,
        emoji: "🍪"
    },

    {
        id: 12,
        name: "Chips",
        category: "Snacks",
        price: 30,
        emoji: "🍟"
    }

];


/* ================= CART ================= */

let cart = [];

let discountAmount = 0;


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(productArray) {

    const productList =
        document.getElementById("productList");

    productList.innerHTML = "";

    if (productArray.length === 0) {

        productList.innerHTML =
            "<h3>No products found.</h3>";

        return;
    }


    productArray.forEach(function(product) {

        productList.innerHTML += `

            <div class="product-card">

                <div class="product-image">
                    ${product.emoji}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="product-price">
                    ₹${product.price}
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

    });

}


/* ================= ADD TO CART ================= */

function addToCart(productId) {

    const product =
        products.find(function(item) {
            return item.id === productId;
        });


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(function(item) {
            return item.id === productId;
        });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            emoji: product.emoji,

            quantity: 1

        });

    }


    updateCart();

    alert(product.name + " added to cart!");
}


/* ================= UPDATE CART ================= */

function updateCart() {

    displayCart();

    calculateBill();

    document.getElementById("cartCount").innerText =
        cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);

}


/* ================= DISPLAY CART ================= */

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                🛒 Your cart is empty.
            </p>
        `;

        return;
    }


    cart.forEach(function(item) {

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>
                        ${item.emoji}
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price}
                    </p>

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    class="quantity button remove-button"
                    onclick="removeItem(${item.id})"
                >
                    🗑️
                </button>

            </div>

        `;

    });

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(productId, change) {

    const item =
        cart.find(function(item) {
            return item.id === productId;
        });


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function(item) {
                return item.id !== productId;
            });

    }


    updateCart();
}


/* ================= REMOVE ITEM ================= */

function removeItem(productId) {

    cart =
        cart.filter(function(item) {
            return item.id !== productId;
        });


    updateCart();
}


/* ================= CALCULATE BILL ================= */

function calculateBill() {

    let subtotalAmount = 0;


    cart.forEach(function(item) {

        subtotalAmount +=
            item.price * item.quantity;

    });


    let deliveryCharge = 40;


    if (subtotalAmount === 0) {
        deliveryCharge = 0;
    }


    let totalAmount =
        subtotalAmount
        - discountAmount
        + deliveryCharge;


    if (totalAmount < 0) {
        totalAmount = 0;
    }


    document.getElementById("subtotal").innerText =
        subtotalAmount;

    document.getElementById("discount").innerText =
        discountAmount;

    document.getElementById("delivery").innerText =
        deliveryCharge;

    document.getElementById("total").innerText =
        totalAmount;

}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");

}


/* ================= SEARCH ================= */

function searchProducts() {

    const searchValue =
        document
            .getElementById("search")
            .value
            .toLowerCase();


    const filteredProducts =
        products.filter(function(product) {

            return (
                product.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchValue)
            );

        });


    displayProducts(filteredProducts);
}


/* ================= CATEGORY FILTER ================= */

function filterCategory(category) {

    if (category === "All") {

        displayProducts(products);

        return;
    }


    const filteredProducts =
        products.filter(function(product) {

            return product.category === category;

        });


    displayProducts(filteredProducts);
}


/* ================= GO TO PRODUCTS ================= */

function goProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= COUPON ================= */

function applyCoupon() {

    const coupon =
        document
            .getElementById("coupon")
            .value
            .trim()
            .toUpperCase();


    const message =
        document.getElementById("couponMessage");


    const subtotal =
        cart.reduce(function(total, item) {

            return total +
                item.price * item.quantity;

        }, 0);


    if (subtotal === 0) {

        message.innerText =
            "Add products to cart first.";

        return;
    }


    if (coupon === "SAVE10") {

        discountAmount =
            Math.round(subtotal * 0.10);

        message.innerText =
            "10% discount applied!";

    }

    else if (coupon === "SAVE50") {

        discountAmount = 50;

        if (discountAmount > subtotal) {
            discountAmount = subtotal;
        }

        message.innerText =
            "₹50 discount applied!";

    }

    else {

        discountAmount = 0;

        message.innerText =
            "Invalid coupon code.";

    }


    calculateBill();
}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    const deliveryDate =
        document.getElementById("deliveryDate").value;


    const deliveryTime =
        document.getElementById("deliveryTime").value;


    if (deliveryDate === "") {

        alert("Please select delivery date.");

        return;
    }


    if (deliveryTime === "") {

        alert("Please select delivery time.");

        return;
    }


    const randomNumber =
        Math.floor(
            100000 + Math.random() * 900000
        );


    const orderNumber =
        "FC" + randomNumber;


    localStorage.setItem(
        "orderId",
        orderNumber
    );

    localStorage.setItem(
        "deliveryDate",
        deliveryDate
    );

    localStorage.setItem(
        "deliveryTime",
        deliveryTime
    );


    alert(
        "Order placed successfully!\n\n" +
        "Order ID: " + orderNumber +
        "\nDelivery: " +
        deliveryDate +
        " (" +
        deliveryTime +
        ")"
    );


    cart = [];

    discountAmount = 0;


    document.getElementById("coupon").value = "";

    document.getElementById("couponMessage").innerText = "";


    updateCart();

    closeCart();

}


/* ================= TRACK ORDER ================= */

function trackOrder() {

    const enteredId =
        document
            .getElementById("orderId")
            .value
            .trim()
            .toUpperCase();


    const savedOrderId =
        localStorage.getItem("orderId");


    const result =
        document.getElementById("trackingResult");


    if (enteredId === "") {

        result.innerHTML = `
            <div class="tracking-status">
                Please enter your order ID.
            </div>
        `;

        return;
    }


    if (
        savedOrderId &&
        enteredId === savedOrderId
    ) {

        const date =
            localStorage.getItem("deliveryDate");

        const time =
            localStorage.getItem("deliveryTime");


        result.innerHTML = `

            <div class="tracking-status">

                <h3>
                    📦 Order ${savedOrderId}
                </h3>

                <p>✅ Order Confirmed</p>

                <p>✅ Order Packed</p>

                <p>🚚 Out for Delivery</p>

                <p>⏳ Delivery Scheduled</p>

                <hr>

                <p>
                    <strong>Date:</strong>
                    ${date}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${time}
                </p>

            </div>

        `;

    }

    else {

        result.innerHTML = `

            <div class="tracking-status">

                ❌ Order not found.

                <br><br>

                Please enter the correct
                order ID.

            </div>

        `;

    }

}


/* ================= ADMIN ================= */

let adminProducts = [];


/* ================= ADD ADMIN PRODUCT ================= */

function addProduct() {

    const name =
        document
            .getElementById("adminName")
            .value
            .trim();


    const price =
        Number(
            document
                .getElementById("adminPrice")
                .value
        );


    const stock =
        Number(
            document
                .getElementById("adminStock")
                .value
        );


    if (
        name === "" ||
        price <= 0 ||
        stock < 0
    ) {

        alert(
            "Please enter valid product details."
        );

        return;
    }


    adminProducts.push({

        id: Date.now(),

        name: name,

        price: price,

        stock: stock

    });


    document.getElementById("adminName").value = "";

    document.getElementById("adminPrice").value = "";

    document.getElementById("adminStock").value = "";


    displayAdmin();

}


/* ================= DISPLAY ADMIN ================= */

function displayAdmin() {

    const adminList =
        document.getElementById("adminList");


    adminList.innerHTML = "";


    if (adminProducts.length === 0) {

        adminList.innerHTML =
            "<p>No admin products added.</p>";

        return;
    }


    adminProducts.forEach(function(product) {

        adminList.innerHTML += `

            <div class="admin-item">

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <br>

                    Price: ₹${product.price}

                    <br>

                    Stock: ${product.stock}

                </div>


                <button
                    class="delete-button"
                    onclick="deleteAdmin(${product.id})"
                >
                    Delete
                </button>

            </div>

        `;

    });

}


/* ================= DELETE ADMIN PRODUCT ================= */

function deleteAdmin(productId) {

    adminProducts =
        adminProducts.filter(function(product) {

            return product.id !== productId;

        });


    displayAdmin();
}


/* ================= RECOMMENDATIONS ================= */

function displayRecommendations() {

    const recommendationList =
        document.getElementById(
            "recommendationList"
        );


    recommendationList.innerHTML = "";


    const recommended =
        products.slice(0, 4);


    recommended.forEach(function(product) {

        recommendationList.innerHTML += `

            <div class="product-card">

                <div class="product-image">
                    ${product.emoji}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="product-price">
                    ₹${product.price}
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

    });

}


/* ================= PAGE LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProducts(products);

        displayRecommendations();

        displayAdmin();

        updateCart();

    }
);