// Filter toggle-button functionality
document.querySelectorAll('.toggle-button').forEach(button => {
  button.addEventListener('click', () => {
    const parent = button.parentElement;
    const content = parent.querySelector('.filter-content');
    if (content.style.maxHeight) {
      // if section is open, close it
      content.style.maxHeight = null;
    } else {
      // if section is closed, open it
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
});


// Price filter slider current value
const priceSlider = document.getElementById('price');
const priceOutput = document.getElementById('price-output');

priceSlider.addEventListener('input', () => {
  priceOutput.textContent = priceSlider.value;
});