var slideIndex = 1;
                showDivs(slideIndex);

                function plusDivs(n) {
                    showDivs(slideIndex += n);
                }

                function showDivs(n) {
                    var i;
                    var x = document.getElementsByClassName("mySlides");
                    if (n > x.length) {
                        slideIndex = 1
                    }
                    if (n < 1) {
                        slideIndex = x.length
                    }
                    for (i = 0; i < x.length; i++) {
                        x[i].style.display = "none";
                    }
                    x[slideIndex - 1].style.display = "block";
                }

    function chooseSize(size) {
    // Get all the size buttons
    var sizeButtons = document.querySelectorAll('.size-button');

    var chosenButton = document.getElementById('size-' + size.toLowerCase());
    var sizeLabel = document.querySelector('.product-sizes h4');

    // Check if another button is already chosen and revert it
    for (var i = 0; i < sizeButtons.length; i++) {
        if (sizeButtons[i].classList.contains('chosen') && sizeButtons[i] !== chosenButton) {
            sizeButtons[i].classList.remove('chosen');
        }
    }

    if (chosenButton.classList.contains('chosen')) {
        sizeLabel.innerHTML = 'Size:';
        chosenButton.classList.remove('chosen');
    } else {
        chosenButton.classList.add('chosen');
        sizeLabel.innerHTML = 'Size: ' + size;
    }
}