import { dataMapping } from "./controllers.js";
import { cartQuantity } from "./until.js";

// Fetching all products
export async function getProducts() {
  try {
    const response = await fetch('products.json');
    const data = await response.json();
   
    dataMapping(data, 'clothes'); // Initial rendaring
    cartQuantity();
    
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}