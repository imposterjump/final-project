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
function updatePrice() {

  const quantityElem = document.getElementById('quantity');
  const priceElem = document.querySelector('.product-details p:first-of-type');
  const quantity = parseInt(quantityElem.value);
  const newPrice = quantity * 100;
  priceElem.textContent = `Price: $${newPrice.toFixed(2)}`;
}

  function toggleCardDetails() {
			var cardDetails = document.getElementById("card-details");
			if (document.getElementById("visa").checked) {
				cardDetails.style.display = "block";
			} else {
				cardDetails.style.display = "none";
			}
		}
        function validatee(form) {
  const nameInput = form.elements['name'];
  const addressInput = form.elements['address'];
  const cityInput = form.elements['city'];
  const stateInput = form.elements['state'];
  const zipInput = form.elements['zip'];

  const nameRegex = /^[A-Za-z\s]+$/;
  const addressRegex = /^[A-Za-z0-9\s]+$/;
  const cityRegex = /^[A-Za-z\s]+$/;
  const stateRegex = /^[A-Za-z]{2}$/;
  const zipRegex = /^\d{5}$/;




  if (!nameRegex.test(nameInput.value)) {
    alert('Please enter a valid name (letters and spaces only).');
    return false;
  }

  if (!addressRegex.test(addressInput.value)) {
    alert('Please enter a valid address (letters, numbers, and spaces only).');
    return false;
  }

 
  if (!cityRegex.test(cityInput.value)) {
    alert('Please enter a valid city name (letters and spaces only).');
    return false;
  }

  if (!stateRegex.test(stateInput.value)) {
    alert('Please enter a valid 2-letter state code.');
    return false;
  }

  if (!zipRegex.test(zipInput.value)) {
    alert('Please enter a valid 5-digit zip code.');
    return false;
  }


  return true;
        }
    

        function validate(form) {
            if (document.getElementById("visa").checked) {

  const cardNameInput = form.elements['card-name'];
  const cardNumberInput = form.elements['card-number'];
  const expiryDateInput = form.elements['expiry-date'];
  const cvvInput = form.elements['cvv'];


  const cardNameRegex = /^[A-Za-z\s]+$/;
  const cardNumberRegex = /^\d{16}$/;
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^\d{3}$/;


  if (!cardNameRegex.test(cardNameInput.value)) {
    alert('Please enter a valid cardholder name (letters and spaces only).');
    return false;
  }

  if (!cardNumberRegex.test(cardNumberInput.value)) {
    alert('Please enter a valid 16-digit card number.');
    return false;
  }

  if (!expiryDateRegex.test(expiryDateInput.value)) {
    alert('Please enter a valid expiry date (MM/YY).');
    return false;
  }
  
  const expiryDateParts = expiryDateInput.value.split('/');
  const expiryMonth = parseInt(expiryDateParts[0], 10);
  const expiryYear = parseInt(expiryDateParts[1], 10) + 2000;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
    alert('Card has expired, please use a valid card.');
    return false;
  }


  if (!cvvRegex.test(cvvInput.value)) {
    alert('Please enter a valid 3-digit CVV.');
    return false;
  }
            

  return true;
}
else{
    return false;
}
        };

const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const button = document.getElementById('button1');

button.addEventListener('click', function(event) {
  event.preventDefault(); 
  
  if (validatee(form1) && validate(form2) || validatee(form1) && document.getElementById("cash").checked  ) {
    form1.submit(); 
    form2.submit(); 
    alert('Forms submitted successfully!');
  } 

 
  else {
    alert('Please fill out all required fields correctly.');
  }
});
	