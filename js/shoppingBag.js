const shoppingBag = document.getElementById("shopping-bag");
export function toggleShoppingBag () {
    if (shoppingBag.style.display === "none" || shoppingBag.style.display === "") {
        shoppingBag.style.display = "block";
        shoppingBag.classList.add("shopping-bag-scrollable");
    } else {
        shoppingBag.style.display = "none";
        shoppingBag.classList.remove("shopping-bag-scrollable");
    }
}

export function displayShoppingBag(checkOutUrl) {
    let jacketData = JSON.parse(window.localStorage.getItem("myShoppingCart")) || [];

    const shoppingBagDiv = document.getElementById("shopping-bag");

    let jacketsHTML = "";
    let totalPrice = 0;

    jacketData.forEach((jacket, index) => {
        jacketsHTML += `
            <div class="jacket-item">
                <img src="${jacket.image}" alt="${jacket.description}">
                <h4>${jacket.title}</h4>
                <p>Size: ${jacket.selectedSize}</p>
                <p>$${jacket.price}</p>
                <button class="delete-btn" data-index="${index}">Remove</button>
            </div>
        `;
        totalPrice += jacket.price;
    });

    shoppingBagDiv.innerHTML = `
        <div id="jackets-container">${jacketsHTML}</div>
        <p id="total-price">Total Price: <span id="total-span">$${totalPrice.toFixed(2)}</span></p>
        <button id="checkout-btn">Proceed to checkout</button>
    `;

    if (jacketData.length === 0) {
        shoppingBagDiv.innerHTML = "<p>Your shopping bag is empty.</p>";
    }
    shoppingBagDiv.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = parseInt(event.target.getAttribute('data-index'));
            jacketData.splice(index, 1);
            window.localStorage.setItem("myShoppingCart", JSON.stringify(jacketData));

            displayShoppingBag(checkOutUrl);

        })
    })
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.addEventListener('click', () => {
        if (jacketData.length === 0) {
            alert("You have no items in your bag to proceed with.");
        } else location.href = checkOutUrl;
    })
}
