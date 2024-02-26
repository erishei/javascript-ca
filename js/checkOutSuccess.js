const shoppingBagBtn = document.getElementById("shopping-bag-btn");
const continueShoppingBtn = document.getElementById("continue-shopping-btn");

import {toggleShoppingBag} from "./shoppingBag.js";
shoppingBagBtn.addEventListener('click', function (){
    toggleShoppingBag()
});

continueShoppingBtn.addEventListener('click', () =>{
   location.href = "../index.html";
});
