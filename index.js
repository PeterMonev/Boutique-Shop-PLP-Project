import {  backToShopPageBtn, eventProductsFilter, loadMore, myAccount, myAccountClearsButton, productsSorting } from "./src/controllers.js";
import { initProductsCategory } from "./src/controllers.js";

// Products category buttons functionality
const productsButtons = document.querySelectorAll('.nav__button'); // Getting header products buttons
productsButtons.forEach(button => {
  button.addEventListener('click', initProductsCategory);
});

// Sorting buttons functionality
const sortingButtons = document.querySelectorAll('.div__sorting__btns button');
sortingButtons.forEach(button => {
  button.addEventListener('click', productsSorting)});

// Filter products functionality
document.querySelector('.filterBtn').addEventListener('click', eventProductsFilter)

// My account function
document.querySelector('#account').addEventListener('click', myAccount);

// My account page clear products button function
document.querySelector('#clearAllStorage').addEventListener('click', myAccountClearsButton);

// Back to the shop button function
document.querySelector('#backToShopBtn').addEventListener('click', backToShopPageBtn);

// Load More button function
document.querySelector('.loadMore__btn').addEventListener('click', loadMore); 

// Aside section toggle functionality
const toggleBtnFilters = document.querySelector(".accordion__toggleBtn__filterSection");
const aside = document.querySelector(".accordion__content");

toggleBtnFilters.addEventListener("click", function() {
  aside.classList.toggle("openAccordionFilterSection");
  toggleBtnFilters.classList.toggle('rotate'); // Make button rotate 180degrees
});

// Filter toggle-button functionality
document.querySelectorAll('.toggle__button__filterContent').forEach(button => {
  button.addEventListener('click', () => {
    const filterContainer = button.parentElement; // Get filter container
    button.children[0].classList.toggle('rotate') // Make button rotate 180degrees
    const filterContent = filterContainer.querySelector('.filter__content'); // Get filter content
    filterContent.classList.toggle('openFilterContent');
  });
});


// Price filter slider current value
const priceSlider = document.getElementById('price');
const priceOutput = document.getElementById('priceValue');

priceSlider.addEventListener('input', () => {
  priceOutput.textContent = priceSlider.value; // Set current value at slider
});


