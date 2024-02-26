const singleProduct = document.getElementById("single-product");
const loadingDiv = document.getElementById("loader");
const sizeSelector = document.getElementById("size-selector");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const addToCartDiv = document.querySelector(".add-to-cart-div");
let productData = [];
let selectedProduct;
const shoppingBagBtn = document.querySelector(".shopping-bag-btn");
const checkOutUrl = "./checkout.html";


import {toggleShoppingBag} from "./shoppingBag.js";
shoppingBagBtn.addEventListener('click', function (){
    toggleShoppingBag()
});

async function displaySingleProduct() {
    const parameterString = window.location.search;
    const searchParameters = new URLSearchParams(parameterString);
    const jacketID = searchParameters.get("id");

    loadingDiv.style.display = "block";

    try {
        const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
        const productResultData = await response.json();
        productData = productResultData;
        let found = false;

        for (const jacket of productData) {
            if (jacket.id === jacketID) {
                selectedProduct = jacket;
                console.log(selectedProduct);
                singleProduct.innerHTML += `
                  <div class="product-div">
            <img class="product-img" src="${jacket.image}" alt="Image of ${jacket.title}">
            <h4>${jacket.title}</h4>
            <p>$${jacket.price}</p>
            <p>${jacket.description}</p>
                  </div>
                `
            for (let i = 0; i < jacket.sizes.length; i++){
                sizeSelector.innerHTML += `<option>${jacket.sizes[i]}</option>`;
            }
                found = true;
                break;
            }
        }
        if (found === false) {
            window.location.href = "../index.html";
        }
    } catch (error) {
        console.error(error);
    }
    loadingDiv.style.display = "none";
}

displaySingleProduct(checkOutUrl)

addToCartDiv.addEventListener("click", (event) => {
    const shoppingCart = JSON.parse(window.localStorage.getItem("myShoppingCart")) || [];
    const selectedSize = sizeSelector.value;
    if (event.target === addToCartBtn) {
        if (selectedSize !== "default") {
            console.log(selectedSize);
            selectedProduct.selectedSize = selectedSize;
            shoppingCart.push(selectedProduct);
            window.localStorage.setItem("myShoppingCart", JSON.stringify(shoppingCart));
            console.log("Product added to cart");


            displayShoppingBag(checkOutUrl);

        } else {
            alert("Please select a size before adding to cart.");
        }
    }
});

import { displayShoppingBag } from "./shoppingBag.js";

displayShoppingBag(checkOutUrl);
