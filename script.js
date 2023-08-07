document.querySelectorAll('.toggle-button').forEach(function(button) {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      const filterContent = this.nextElementSibling;
      if (filterContent.style.maxHeight){
        filterContent.style.maxHeight = null;
      } else {
        filterContent.style.maxHeight = filterContent.scrollHeight + "px";
      } 
    });
  });
  