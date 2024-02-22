const jacketListDiv = document.getElementById("jacket-list");
const dropDownGenderList = document.getElementById("filter-list");
const loadingDiv = document.getElementById("loader");
const shoppingBagBtn = document.querySelector(".shopping-bag-btn");

let productData = [];

import {toggleShoppingBag} from "./shoppingBag.js";
shoppingBagBtn.addEventListener('click', function (){
    toggleShoppingBag()
});

async function fetchProducts() {
    loadingDiv.style.display = "block";
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
        const productResultData = await response.json();
        productData = productResultData;

        displayProduct(productData);

        console.log(productData);
    } catch (error) {
        alert("Couldn't load jackets");
    }
    loadingDiv.style.display = "none";
}

dropDownGenderList.addEventListener("change",
    function () {
        let genderToFilterBy = dropDownGenderList.value;
        console.log(genderToFilterBy);

        if (genderToFilterBy === "show-all") {
            fetchProducts();
        } else {
            filterByGender(genderToFilterBy);
        }
    })

async function filterByGender(genderToFilterBy) {
    loadingDiv.style.display = "block";
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
        const productResultData = await response.json();
        productData = productResultData;

        jacketListDiv.innerHTML = "";

        productData.forEach((jacket) => {
            if (jacket.gender === genderToFilterBy) {
                jacketListDiv.innerHTML += `
                  <a href="pages/product.html?id=${jacket.id}">
            <img src="${jacket.image}" alt="Image of ${jacket.title}">
            <p>${jacket.title}</p>
            <p>${jacket.price}</p>
                  </a>
                `
            }
        })

        console.log(productData);
    } catch (error) {
        alert("Couldn't load jackets");
    }
    loadingDiv.style.display = "none";
}

function displayProduct(productData) {
    jacketListDiv.innerHTML = "";
    productData.forEach((jacket) => {
        jacketListDiv.innerHTML += `
        <a href="pages/product.html?id=${jacket.id}">
            <img src="${jacket.image}" alt="Image of ${jacket.title}">
            <p>${jacket.title}</p>
            <p>${jacket.price}</p>
        </a>
    `;
    })

}

fetchProducts()


