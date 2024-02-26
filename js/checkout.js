const checkoutData = JSON.parse(window.localStorage.getItem("myShoppingCart")) || [];
const checkoutSummaryDiv = document.getElementById("checkout-items-list");
const checkoutSubmitBtn = document.getElementById("checkout-submit-btn");

function displayCheckoutSummary() {
    let totalPrice = 0;
    let summaryHTML = "";

    checkoutData.forEach((product, index) => {
        summaryHTML += `
            <div class="product-container">
                <img src="${product.image}" alt="Picture of ${product.title}"/>
                <h3>${product.title}</h3>
                <p>Size: ${product.selectedSize}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        totalPrice += product.price;
    });

    summaryHTML += `<p>Total: <span id="total-span">$${totalPrice.toFixed(2)}</span></p>`;
    checkoutSummaryDiv.innerHTML = summaryHTML;

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute('data-index'));
            checkoutData.splice(index, 1);
            window.localStorage.setItem("myShoppingCart", JSON.stringify(checkoutData));
            displayCheckoutSummary();
        });
    });
}

displayCheckoutSummary();

checkoutSubmitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const yourNameInput = document.getElementById("your-name");
    const paymentCardInput = document.getElementById("payment-card");
    const expiryInput = document.getElementById("expiry");
    const cvcInput = document.getElementById("cvc");

    if (
        yourNameInput.value &&
        paymentCardInput.value &&
        expiryInput.value &&
        cvcInput.value
    ) {
        window.location.href = "./checkoutSuccess.html";
    } else {
        alert("Please fill out the form.")
    }
});
