import { cartQuantity } from "./until.js";

//Set JSON in localStorage function
export function addToLocalStorage(product) {
    let products = JSON.parse(localStorage.getItem('myaccount') || "[]");  // Get the existing products from LocalStorage
    products.push(product); // Add the new product

    localStorage.setItem('myaccount', JSON.stringify(products)); // Save the updated products back to LocalStorage
    cartQuantity();
}

  //Get JSON from localStorage fucntion
export  function getToLocalStorage(){
    const products = JSON.parse(localStorage.getItem('myaccount')) // Get the existing products from LocalStorage
    return products
  }

  //Clear localStorage fucntiona
export  function clearLocalStorage(){
    localStorage.clear();
    cartQuantity();
  }