let myIndex = 0;
    function slides()
    {
        let images = document.getElementsByClassName("mySlides");
        for(let i = 0; i < images.length;i++){
            images[i].style.display = "none";
        }
        if (myIndex > images.length-1){
            myIndex = 0;
        }
        images[myIndex].style.display = "block";
        myIndex++;
        setTimeout(slides,4000);
    }

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }
    const containers = document.querySelectorAll('.container');

function checkScroll() {
  containers.forEach(container => {
    const containerTop = container.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (containerTop < windowHeight - 100) {
      container.classList.add('show');
    }
  });
}

window.addEventListener('scroll', checkScroll);
     var slideIndex = 0;
  showSlides();


  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000); 
  };
  // JavaScript code
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
});

const containerss = document.querySelectorAll('.container');

containers.forEach((container) => {
  observer.observe(container);
});
