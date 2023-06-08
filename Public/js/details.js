const deleteBtnElement = document.querySelector(".delete");
const editBtnElement = document.querySelector(".edit");
const productId = deleteBtnElement.getAttribute("data-linkid");

deleteBtnElement.addEventListener("click", () => {
  fetch(`/details/${productId}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => (window.location.href = data.mylink))
    .catch((err) => {
      console.log(err);
    });
});

editBtnElement.addEventListener("click", () => {
  window.location.href = `/edit-product/${productId}`;
});