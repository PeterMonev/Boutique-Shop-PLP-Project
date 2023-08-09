async function getProducts() {
  try {
    const response = await fetch('products.json');
    const data = await response.json();
  
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

const allProducts = await getProducts();

const productsButtons = document.querySelectorAll('.nav__button');
productsButtons.forEach(button => {
  button.addEventListener('click', function(event){
    const productChoose = button.textContent.toLowerCase()

    const mainProductSection = document.querySelector('.main__products');
    mainProductSection.innerHTML = "";

    allProducts[productChoose].map(product => {
      showProducts(product)
    })
  
  });
});

// Gold stars generate functionality

function creatingStart(rating){
  let stars = ''; 

  for(let i = 1; i <= 5; i++){
    if(i <= rating){
      stars += '<span class="star filled">&#9733;</span>'; // Crate gold stars
    } else {
      stars += '<span class="star">&#9734;</span>'; // Create empty stars
    }
  }
  return stars;
}

// Discount price functionality

function creatingDiscountPrice(price,discountedPrice){
  let currendPrice = '';

   if(discountedPrice !== null){
    currendPrice = `<span class="price discounted"> $${price}</span><span class="discounted-price"> $${discountedPrice}</span>` // Crate span who have discount price
   } else {
    currendPrice = `<span class="price"> $${price}</span>`; // Create span without discount
   }

   return currendPrice;
}

function showProducts(products){
 const mainProductSection = document.querySelector('.main__products');
//  console.log(products.price, products.discounted_price);
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

</article>`)

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


