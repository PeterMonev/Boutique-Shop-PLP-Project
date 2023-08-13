import { getProducts } from "./fetchAPI.js";
import { addToLocalStorage, clearLocalStorage, getToLocalStorage } from "./localStorage.js";
import { generateCategoryDescriptionText, checkForEmptyState, clearAllArticleProducts } from "./until.js";
import { showProducts } from "./views.js";

let productsState = []; // State products
let currChooseProducts = 'clothes'; // Current Choosen product
const loadMoreBtn = document.querySelector('.loadMore__btn');// Get load more button
const mainSectionContainer = document.querySelector('.main__section__front');
const mainSectionAside = document.querySelector('.main__aside__left');
const mainSectionAccount =  document.querySelector('.main__account__section');

const allProducts = await getProducts(); // Getting products from fetch in list

// Mapping Data function
export function dataMapping(products, choosenProducts){
    const slicedProducts = products[choosenProducts].slice(0,15); // Getting only 5 rows of product when initialize
 
    productsState = []; // Clear products state
    generateCategoryDescriptionText(products[choosenProducts], choosenProducts);
 
     // Statement for load button
     if(slicedProducts.length < 15){
       loadMoreBtn.style.display = 'none';  // Hide load more button there isn't enough products
      } else {
        loadMoreBtn.style.display = "inline"; // Show load more button when there are enough products
      }
 
      slicedProducts.map(function(product){
       showProducts(product) // Show remaining products
       productsState.push(product) // Pushing remaining products
     }); // Iterate remaining products
     
     productsState = slicedProducts; // Set the current displayed product
     checkForEmptyState(productsState)
     addToCart();
 }

// Products category button function
export function initProductsCategory(){
    currChooseProducts = this.textContent.toLowerCase() // Getting name of the products want
      clearAllArticleProducts() // Clear all currently displayed products
      dataMapping(allProducts, currChooseProducts) // Iterate all products
  
      mainSectionContainer.style.display = 'inline';
      mainSectionAside.style.display = 'flex';
      mainSectionAccount.style.display = 'none';
      document.querySelector('.empty__p').style.display = 'none'
}

 // Load more button function
export function loadMore(){
    const remainingProducts =  allProducts[currChooseProducts].slice(15); // Get remaining products
  
    remainingProducts.map(function(product){
      showProducts(product) // Show remaining products
      productsState.push(product) // Pushing remaining products
    } ); // Iterate remaining products
  
    addToCart();
    document.querySelector('.loadMore__btn').style.display = "none"; // Hide load more button
}

// Sorting button function
export function productsSorting(event){ 
    clearAllArticleProducts() // Clear all currently displayed products
  
    if(event.target.id === 'sortingA'){
     productsState.sort((a, b) => a.name.localeCompare(b.name)); // Sorting by name A-Z
    } 
    
    if (event.target.id === 'sortingZ'){
      productsState.sort((a, b) => b.name.localeCompare(a.name)); // Sorting by name Z-A
    }
  
    // Sorting by Higher price
    if (event.target.id === 'sortingHigh'){
      productsState.sort((a, b) => {
        const priceA = a.discounted_price !== null ? a.discounted_price : a.price; //Checking "a" for a discount price, if it is null we return price, if is not null take discout price
        const priceB = b.discounted_price !== null ? b.discounted_price : b.price; //Checking "b" for a discount price, if it is null we return price, if is not null take discout price
    
        return priceB - priceA; // Compare B - A
    });
    }
    
    // Sorting by Lower price
    if(event.target.id === "sortingLow"){
      productsState.sort((a,b) => {
        const priceA = a.discounted_price !== null ? a.discounted_price : a.price; //Checking "a" for a discount price, if it is null we return price, if is not null take discout price
        const priceB = b.discounted_price !== null ? b.discounted_price : b.price; //Checking "b" for a discount price, if it is null we return price, if is not null take discout price
  
        return priceA - priceB;  // Compare A - B
      } )
    }
  
    productsState.map(product => {
      showProducts(product);
    });
    addToCart();
  }
//Filter buttons events
export function eventProductsFilter(event){
    event.preventDefault();

    let filteredProducts = filterProducts(allProducts[currChooseProducts]); // Takes all filtered products
    productsState = filteredProducts; // Save filtered prodcuts in productsState

    clearAllArticleProducts() // Clear all currently displayed products
    filteredProducts.map(product => showProducts(product)); // Iterate all filtered products
    loadMoreBtn.style.display = 'none';
    checkForEmptyState(productsState);
    addToCart();
  }
  
  // Filter products function
  function filterProducts(products){
    const nameFilter = document.querySelector('.input__nameFilter').value.toLowerCase(); // Take name input
    const colorFilter = document.querySelector('.input__color').value; // Take color input
    const priceFilter = document.querySelector('.input__price').value; // Take price input

    return products.filter(product =>{
      
      const isNameMatch = !nameFilter || product.name.toLowerCase().includes(nameFilter); // Checks if there is an name input and filters it
      const isColorMatch = !colorFilter || product.color === colorFilter;  // Checks if there is an color select and filters it
      const isPriceMatch = !priceFilter || (product.discountedPrice ? product.discounted_price : product.price) <= priceFilter;  // Checks if there is an price input and filters it
  
      return isNameMatch && isColorMatch && isPriceMatch; // Return filtered matches
    })
  }

// Adding products in localStorage to my account function
export function addToCart(){
    document.querySelectorAll('.add__button').forEach(button => {
      button.addEventListener('click', function(){
   
        const product = this.parentElement;
  
        const productDetails = {
          name: product.querySelector('h2').textContent,
          image_url: product.querySelector('.product__img').src,
          description: product.querySelector('p').textContent,
          price: product.querySelector('.price').textContent,
          discounted_price: product.querySelector('.discounted-price') ? product.querySelector('.discounted-price').textContent : null,
          rating: product.querySelectorAll('.star.filled').length, // Count the number of filled stars for rating
      };
      addToLocalStorage(productDetails); // Call set localStorage function
      })
    });
}

// My account funtion
export function myAccount(){
    mainSectionContainer.style.display = 'none';
    mainSectionAside.style.display = 'none';
    loadMoreBtn.style.display = 'none';
    mainSectionAccount.style.display = 'block';
    document.querySelector('.empty__cart').style.display = 'none';
  
    const mainContainer = document.querySelector('.account__products__section')   
    clearAllArticleProducts(mainContainer); // Clear container before Initializing
    const products = getToLocalStorage(); // Get products from
  
    if(products === null) {
     document.querySelector('.empty__cart').style.display = 'block'
    } else {
      products.map(product => {
        showProducts(product, mainContainer, true)
      });
    }
  }
  
// My account page clear products button function
export function myAccountClearsButton () {
    const mainAccountSection = document.querySelector('.account__products__section'); // Take main account products
    document.querySelector('.empty__cart').style.display = 'block'
    clearAllArticleProducts(mainAccountSection); // Call claer Container function
    clearLocalStorage(); // Clear localStorage
}  


// Back to the shop button function
export function backToShopPageBtn(){
    mainSectionContainer.style.display = 'inline';
    mainSectionAside.style.display = 'flex';
    loadMoreBtn.style.display = 'flex';
    mainSectionAccount.style.display = 'none';
  }