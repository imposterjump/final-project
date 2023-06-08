function updateTotal() {
    let total = 0;
    const prices = document.querySelectorAll('.product-price');
    const quantities = document.querySelectorAll('.quantity-select');
    
    for (let i = 0; i < prices.length; i++) {
      const price = parseFloat(prices[i].textContent.replace('EGP ', ''));
      const quantity = parseInt(quantities[i].value);
      total += price * quantity;
    }

    const totalValue = document.querySelector('.total-value');
    totalValue.textContent = 'EGP ' + total.toFixed(2);
  }

  const form = document.querySelector('#orderForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Gather the required data from the form
    const products = Array.from(document.querySelectorAll('.product-name')).map((nameElement, index) => ({
      name: nameElement.textContent.trim(),
      quantity: parseInt(document.querySelectorAll('.quantity-select')[index].value)
    }));
    const total = parseFloat(document.querySelector('.total-value').textContent.replace('EGP ', ''));
    const firstName = document.querySelector('input[name="firstname"]').value;
    const lastName = document.querySelector('input[name="lastname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const paymentMethod = document.querySelector('select[name="paymentMethod"]').value;
    

    // Create an object with the data to be sent to the server
    const data = {
      products,
      total,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      paymentMethod,

    };

    // Send a POST request to the server with the order data
    fetch('/shippingform/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        window.location.href = '/ordertrack';
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        window.location.href = '/cart';
      });
  });

  const quantityInputs = document.querySelectorAll('.quantity-select');
  quantityInputs.forEach((input) => {
    input.addEventListener('change', updateTotal);
  });

  // Calculate the initial total
  updateTotal();