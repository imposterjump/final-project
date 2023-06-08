function sortProducts(sortOption) {
    let products = Array.from(document.querySelectorAll('.column'));
    let container = document.querySelector('.row');

    if (sortOption === 'highToLow') {
        products.sort((a, b) => {
            let priceA = parseInt(a.querySelector('.after').textContent.replace('EGP', ''));
            let priceB = parseInt(b.querySelector('.after').textContent.replace('EGP', ''));
            return priceB - priceA;
        });
    } else if (sortOption === 'lowToHigh') {
        products.sort((a, b) => {
            let priceA = parseInt(a.querySelector('.after').textContent.replace('EGP', ''));
            let priceB = parseInt(b.querySelector('.after').textContent.replace('EGP', ''));
            return priceA - priceB;
        });
    }

    products.forEach((product) => {
        container.appendChild(product);
    });
}


const products = Array.from(document.querySelectorAll('.column'));
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

// Set the number of products per page
const productsPerPage = 6;

// Set the initial page number to 1
let currentPage = 1;

// Calculate the number of pages based on the number of products and the products per page
const totalPages = Math.ceil(products.length / productsPerPage);

// Define a function to show the products for the current page
function showProductsForPage(pageNumber) {
    // Calculate the start and end index for the products on the current page
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Hide all products
    products.forEach(product => product.style.display = 'none');

    // Show the products for the current page
    products.slice(startIndex, endIndex).forEach(product => product.style.display = 'block');
}

// Show the products for the initial page
showProductsForPage(currentPage);

// Add a click event listener to the previous button
previousButton.addEventListener('click', () => {

    // Disable the previous button if on the first page
    if (currentPage === 1) {
        previousButton.disabled = true;
    } else {
        currentPage--;
    }

    // Enable the next button
    nextButton.disabled = false;


    // Show the products for the new current page
    showProductsForPage(currentPage);
});

// Add a click event listener to the next button
nextButton.addEventListener('click', () => {


    // Disable the next button if on the last page
    if (currentPage === totalPages) {
        nextButton.disabled = true;
    } else {
        currentPage++;
    }
    // Enable the previous button
    previousButton.disabled = false;



    // Show the products for the new current page
    showProductsForPage(currentPage);
});

// Disable the previous button if on the first page
if (currentPage === 1) {
    previousButton.disabled = true;
}

// Disable the next button if on the last page
if (currentPage === totalPages) {
    nextButton.disabled = true;
}