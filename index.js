// Fetching all products
async function getProducts() {
  try {
    const response = await fetch('products.json');
    const data = await response.json();
   
    dataMapping(data, 'clothes'); // Initial rendaring
  
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

let productsState = []; // State products
let currChooseProducts = 'clothes'; // Current Choosen product
const loadMoreBtn = document.querySelector('.loadMore__btn');// Get load more button
const mainProductSection = document.querySelector('.main__products'); // Getting the main container

const allProducts = await getProducts(); // Getting products from fetch in list

let isLoad = false;

// Mapping Data function
function dataMapping(products, choosenProducts){
   const slicedProducts = products[choosenProducts].slice(0,15); // Getting only 5 rows of product when initialize
   productsState = []; // Clear products state

    // Statement for load button
    if(slicedProducts < 15){
      loadMoreBtn.style.display = "none"; // Hide load more button there isn't enough products
     } else {
       loadMoreBtn.style.display = "inline"; // Show load more button when there are enough products
     }

     slicedProducts.map(product => {
      showProducts(product) // Iterate all initial products maximum 5 rows
      });
    
    productsState.push(slicedProducts); // Gets the current displayed product
}

// Products Buttons functionality
const productsButtons = document.querySelectorAll('.nav__button'); // Getting header products buttons
productsButtons.forEach(button => {
  button.addEventListener('click', function(){
    currChooseProducts = button.textContent.toLowerCase() // Getting name of the products want
    mainProductSection.innerHTML = ""; // Clear all currently displayed products
    
  
    dataMapping(allProducts, currChooseProducts) // Iterate all products
  });
});

// Sorting buttons functionality
const sortingButtons = document.querySelectorAll('.div__sorting__btns button');
sortingButtons.forEach(button => {
  button.addEventListener('click', function(event){ 


    mainProductSection.innerHTML = ""; // Clear all currently displayed products


    // if(event.target.id === 'sortingA'){
    //  currProductsState.sort((a, b) => a.name.localeCompare(b.name));
    // } else if (event.target.id === 'sortingZ'){
    //  currProductsState.sort((a, b) => b.name.localeCompare(a.name));
    // }

  
    // currProductsState.map(product => {
    //   showProducts(product)
    // })
 
  })
})


// Gold stars generate functionality
function creatingStart(rating){
  let stars = ''; 

  for(let i = 1; i <= 5; i++){
    if(i <= rating){
      stars += '<span class="star filled">&#9733;</span>'; // Create gold stars
    } else {
      stars += '<span class="star">&#9734;</span>'; // Create empty stars
    }
  }
  return stars; // Return current stars
}

// Discount price functionality
function creatingDiscountPrice(price,discountedPrice){
  let currendPrice = '';

   if(discountedPrice !== null){
    currendPrice = `<span class="price discounted"> $${price}</span><span class="discounted-price"> $${discountedPrice}</span>` // Crate span who have discount price
   } else {
    currendPrice = `<span class="price"> $${price}</span>`; // Create span without discount
   }

   return currendPrice; // Return current prices
}

// Generate product articles view
function showProducts(products){
 const mainProductSection = document.querySelector('.main__products'); // Get main element

 mainProductSection.insertAdjacentHTML('beforeend',`
 <article class="product__article">
 <div class="product__tile">
   <div class="product__div__img">
     <img class="product__img" src="${products.image_url}" alt="product">
   </div>
   <h2>${products.name}</h2>
   <p>${products.description}</p>
     ${creatingDiscountPrice(products.price, products.discounted_price)}
   <div class="stars">
     ${creatingStart(products.rating)}
   </div>
   <button>Add to cart</button>
 </div>

</article>`) // Appending and Iterate all products in articles

};

// // Load more button functionality
loadMoreBtn.addEventListener('click', loadMore); // Call loadMore fucntio

function loadMore(){
  const remainingProducts =  allProducts[currChooseProducts].slice(15); // Get remaining products

  remainingProducts.map(function(product){
    showProducts(product) // Show remaining products
    productsState[0].push(product) // Pushing remaining products
  } ); // Iterate remaining products

  document.querySelector('.loadMore__btn').style.display = "none"; // Hide load more button
}



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
const priceOutput = document.getElementById('price-output');

priceSlider.addEventListener('input', () => {
  priceOutput.textContent = priceSlider.value; // Set current value at slider
});


