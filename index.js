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

// Mapping Data function
function dataMapping(products, choosenProducts){
   const slicedProducts = products[choosenProducts].slice(0,15); // Getting only 5 rows of product when initialize

   productsState = []; // Clear products state

  generateCategoryDescriptionText(products[choosenProducts], choosenProducts)

    // Statement for load button
    if(slicedProducts < 15){
      loadMoreBtn.style.display = "none"; // Hide load more button there isn't enough products
     } else {
       loadMoreBtn.style.display = "inline"; // Show load more button when there are enough products
     }

     slicedProducts.map(function(product){
      showProducts(product) // Show remaining products
      productsState.push(product) // Pushing remaining products
    } ); // Iterate remaining products
    
    productsState = slicedProducts; // Set the current displayed product
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
 
  })
});

// Filter products functionality
  //Filter buttons events
document.querySelector('.filterBtn').addEventListener('click', function(event){
  event.preventDefault();

  const filteredProducts = filterProducts(allProducts[currChooseProducts]); // Takes all filtered products
  productsState = filteredProducts; // Save filtered prodcuts in productsState

  mainProductSection.innerHTML = ""; // Clear all currently displayed products
  filteredProducts.map(product => showProducts(product)); // Iterate all filtered products
})

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


// Generate category and decsription text
function generateCategoryDescriptionText(products, choosenProducts){
  document.querySelector('.category__h1').textContent = `Category: ${choosenProducts.charAt(0).toUpperCase()}${choosenProducts.slice(1)}`; //Take first index and it does UpperCase
  document.querySelector('.products__length').textContent = products.length; 
  const descriptionP = document.querySelector('.description__p');

  if(choosenProducts === 'clothes'){
    descriptionP.textContent = 'Description: Dive into our exclusive online clothing collection, where fashion meets comfort.';
   } else if (choosenProducts === 'shoes') {
    descriptionP.textContent = 'Explore our exquisite range of footwear, tailored for every occasion and stride. Blending fashion with function, our collection ensures both style and comfort.';
   } else if (choosenProducts === 'bags'){
    descriptionP.textContent = 'Discover the perfect blend of style and utility in our curated bag collection. From timeless totes to trendy backpacks, each piece promises quality craftsmanship and unique design.';
   } else if (choosenProducts === 'watches') {
    descriptionP.textContent = 'Timeless elegance meets modern design in our curated collection of watches. Perfect for the sophisticated wrist, each piece blends functionality with style.';
   }

}

// Gold stars generate functionality
function generateStars(rating){
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
function generateDiscountPrice(price,discountedPrice){
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
     ${generateDiscountPrice(products.price, products.discounted_price)}
   <div class="stars">
     ${generateStars(products.rating)}
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
    productsState.push(product) // Pushing remaining products
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
const priceOutput = document.getElementById('priceValue');

priceSlider.addEventListener('input', () => {
  priceOutput.textContent = priceSlider.value; // Set current value at slider
});


