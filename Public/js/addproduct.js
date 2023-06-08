function validateForm() {
    const itemNameInput = document.getElementById("itemName");
    const salesInput = document.getElementById("Sales");
    const descriptionInput = document.getElementById("description");
    const priceBeforeInput = document.getElementById("price_before");
    const priceAfterInput = document.getElementById("price_after");
    const typeInput = document.getElementById("type");
    const imageInput = document.getElementById("image");

    const itemNameError = document.getElementById("itemNameError");
    const salesError = document.getElementById("salesError");
    const descriptionError = document.getElementById("descriptionError");
    const priceBeforeError = document.getElementById("priceBeforeError");
    const priceAfterError = document.getElementById("priceAfterError");
    const typeError = document.getElementById("typeError");
    const imageError = document.getElementById("imageError");

    // Reset error messages
    itemNameError.textContent = "";
    salesError.textContent = "";
    descriptionError.textContent = "";
    priceBeforeError.textContent = "";
    priceAfterError.textContent = "";
    typeError.textContent = "";
    imageError.textContent = "";

    // Validate each field
    let isValid = true;

    if (itemNameInput.value.trim() === "") {
      itemNameError.textContent = "Item name is required";
      isValid = false;
    } else if (itemNameInput.value.trim().length < 6) {
      itemNameError.textContent = "Item name must be at least 6 characters";
      isValid = false;
    }

    if (salesInput.value.trim() === "") {
      salesError.textContent = "Sales value is required";
      isValid = false;
    } else if (isNaN(salesInput.value) || salesInput.value > 100) {
      salesError.textContent = "Sales must be a number between 0 and 100";
      isValid = false;
    }

    if (descriptionInput.value.trim() === "") {
      descriptionError.textContent = "Description is required";
      isValid = false;
    } else if (descriptionInput.value.trim().split(" ").length < 2) {
      descriptionError.textContent = "Description must have at least two words";
      isValid = false;
    }

    if (priceBeforeInput.value.trim() === "") {
      priceBeforeError.textContent = "Price before is required";
      isValid = false;
    } else if (isNaN(priceBeforeInput.value)) {
      priceBeforeError.textContent = "Price before must be a number";
      isValid = false;
    }

    if (priceAfterInput.value.trim() === "") {
      priceAfterError.textContent = "Price after is required";
      isValid = false;
    } else if (isNaN(priceAfterInput.value)) {
      priceAfterError.textContent = "Price after must be a number";
      isValid = false;
    }

    if (typeInput.value === "") {
      typeError.textContent = "Type is required";
      isValid = false;
    }

    if (!imageInput.files || imageInput.files.length === 0) {
      imageError.textContent = "Image is required";
      isValid = false;
    }

    // Return the form's validation status
    return isValid;
  }

  function calculatePriceAfter() {
    const salesInput = document.getElementById("Sales");
    const priceBeforeInput = document.getElementById("price_before");
    const priceAfterInput = document.getElementById("price_after");

    const sales = parseInt(salesInput.value) || 0;
    const priceBefore = parseInt(priceBeforeInput.value) || 0;

    const priceAfter = priceBefore * (100 - sales) / 100;
    priceAfterInput.value = priceAfter > 0 ? priceAfter : 0;
  }

  const salesInput = document.getElementById("Sales");
  const priceBeforeInput = document.getElementById("price_before");
  const priceAfterInput = document.getElementById("price_after");

  salesInput.addEventListener("input", calculatePriceAfter);
  priceBeforeInput.addEventListener("input", calculatePriceAfter);

  calculatePriceAfter();