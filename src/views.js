import { generateDiscountPrice } from "./until.js";
import { generateStars } from "./until.js";

// Generate product articles view
export function showProducts(products, mainContainer, isAdd){
 
  let main = mainContainer;
  
  if(main === undefined){
    main = document.querySelector('.main__products'); // Get main element
  }

  main.insertAdjacentHTML('beforeend',`
 <article class="product__article">
 <div class="product__tile">
   <div class="product__div__img">
     <img class="product__img" src="${products.image_url}" alt="product">
   </div>
   <h2>${products.name}</h2>
   <p>${products.description}</p>
     ${generateDiscountPrice(products.price, products.discounted_price)}
   <div class="stars">
     ${generateStars(products.rating)}
   </div>
   ${ isAdd ? '' : '<button class="add__button">Add to cart</button>'}
 </div>

</article>`) // Appending and Iterate all products in articles

};