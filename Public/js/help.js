/* let myIndex = 0;
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
      } */
/*   var slideIndex = 0;
  showSlides();
 */
/*   function showSlides() {
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
    setTimeout(showSlides, 2500); 
  } */

  const tabs = document.querySelectorAll(".tabs-container .tab");
  const contents = document.querySelectorAll(".tabs-container .content");
  
  const removeActiveClass = () => {
    tabs.forEach((t) => {
      t.classList.remove("active");
    });
  
    contents.forEach((c) => {
      c.classList.remove("active");
    });
  };
  
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => {
      removeActiveClass();
      contents[i].classList.add("active");
      t.classList.add("active");
    });
    
  }
  )
    function toggleText(headingId, textId) {
    const heading = document.getElementById(headingId);
    const text = document.getElementById(textId);

    heading.addEventListener("click", function() {
      if (text.style.display === "none") {
        text.style.display = "block";
      } else {
        text.style.display = "none";
      }
    });
  }
  
  
  for (let i = 1; i <=50; i++) {
  toggleText("heading" + i, "text" + i);
}


