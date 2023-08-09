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

function creatingStart(rating){
  let stars = '';

  for(let i = 1; i <= 5; i++){
    if(i <= rating){
      stars += '<span class="star filled" data-value="' + i + '">&#9733;</span>';
    } else {
      stars += '<span class="star" data-value="' + i + '">&#9734;</span>';
    }
  }
  return stars;
}

function showProducts(products){
 const mainProductSection = document.querySelector('.main__products');

 mainProductSection.insertAdjacentHTML('beforeend',`
 <article class="product__article">
 <div class="product__tile">
   <div class="product__div__img">
     <img class="product__img" src="${products.image_url}" alt="product">
   </div>
   <h2>${products.name}</h2>
   <p>${products.description}</p>
   <span class="price"> $${products.price}<span class="discounted-price"> $80</span></span>
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


