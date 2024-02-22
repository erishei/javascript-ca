const shoppingBag = document.getElementById("shopping-bag");
export function toggleShoppingBag () {
    console.log("you clicked me")
    if (shoppingBag.style.display === "none" || shoppingBag.style.display === "") {
        shoppingBag.style.display = "block";
    } else {
        shoppingBag.style.display = "none";
    }
};

function displayShoppingBag() {
    const jacketData = JSON.parse(window.localStorage.getItem("Rainy Days shopping bag")) || [];

    const shoppingBagDiv = document.getElementById("shopping-bag");

    let jacketsHTML = "";
    let totalPrice = 0;

    jacketData.forEach(jacket => {
        jacketsHTML += `
            <div>
                <p>${jacket.title}</p>
                <p>${jacket.price}</p>
            </div>
        `;
        totalPrice += jacket.price;
    });

    shoppingBagDiv.innerHTML = `
        <div id="jackets-container">${jacketsHTML}</div>
        <p id="total-price">Total Price: $${totalPrice.toFixed(2)}</p>
    `;

    // if (jacketData.length === 0) {
    //     shoppingBagDiv.innerHTML = "<p>Your shopping bag is empty.</p>";
    // }
}

export { displayShoppingBag };


