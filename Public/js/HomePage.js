let myIndexleft = 0;
    function slidesleft()
    {
        let imagesleft = document.getElementsByClassName("mySlidesleft");
        for(let i = 0; i < imagesleft.length;i++){
            imagesleft[i].style.display = "none";
        }
        if (myIndexleft > imagesleft.length-1){
            myIndexleft = 0;
        }
        imagesleft[myIndexleft].style.display = "block";
        myIndexleft++;
        setTimeout(slidesleft,500);
    }

    let myIndexright = 0;
    function slidesright()
    {
        let imagesright = document.getElementsByClassName("mySlidesright");
        for(let i = 0; i < imagesright.length;i++){
            imagesright[i].style.display = "none";
        }
        if (myIndexright > imagesright.length-1){
            myIndexright = 0;
        }
        imagesright[myIndexright].style.display = "block";
        myIndexright++;
        setTimeout(slidesright,4000);
    }

    // Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}