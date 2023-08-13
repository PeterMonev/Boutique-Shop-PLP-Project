// Gold stars generate functionality
export function generateStars(rating) {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span class="star filled">&#9733;</span>'; // Create gold stars
    } else {
      stars += '<span class="star">&#9734;</span>'; // Create empty stars
    }
  }
  return stars; // Return current stars
}

// Discount price functionality
export function generateDiscountPrice(price, discountedPrice) {
  let currendPrice = "";

  if (discountedPrice !== null) {
    currendPrice = `<span class="price discounted"> $${price}</span><span class="discounted-price"> $${discountedPrice}</span>`; // Crate span who have discount price
  } else {
    currendPrice = `<span class="price"> $${price}</span>`; // Create span without discount
  }

  return currendPrice; // Return current prices
}

// Generate category and decsription text
export function generateCategoryDescriptionText(products, choosenProducts){
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

// Quantity products in cart functionality
export function cartQuantity(){
  const quantityDiv = document.querySelector('#account div p');
  const myProducts = JSON.parse(localStorage.getItem('myaccount'));

  if(myProducts === null){
    quantityDiv.textContent = 0;
  } else {
    quantityDiv.textContent = myProducts.length;
  }
 
}

// Clear all articles products
export function clearAllArticleProducts(mainContainer) {
  let main = mainContainer;

  if (main === undefined) {
    main = document.querySelector(".main__products");
  }

  while (main.children.length > 1) {
    main.removeChild(main.lastChild); // Remove all children without first
  }
}

// Checks products state are empty function
export function checkForEmptyState(products){
  let emptyP = document.querySelector('.empty__p');
  const loadMoreBtn = document.querySelector('.loadMore__btn');// Get load more button;

  if(products.length === 0){
    emptyP.style.display = 'block';
    loadMoreBtn.style.display = 'none';
  } else {
    emptyP.style.display = 'none';
  }
}


