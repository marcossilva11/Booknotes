// USER RATING
const ratingInputs = document.querySelectorAll(".user-rating input");
const stars = document.querySelectorAll(".user-rating i");

document.addEventListener("DOMContentLoaded", () => {
  const initialRating = document.querySelector('input[name="rating"]:checked');
  if (initialRating) {
    updateStars(initialRating.value - 1);
  } else {
    updateStars(2);
  }
})

ratingInputs.forEach((input, index) => {
  input.addEventListener("change", () => {
    updateStars(index);
  });
});

function updateStars(selectedIndex) {
  stars.forEach((star, index) => {
    if (index <= selectedIndex) {
      star.classList.remove("bi-star");
      star.classList.add("bi-star-fill");
    } else {
      star.classList.remove("bi-star-fill");
      star.classList.add("bi-star");
    }
  });
}

// OPEN/CLOSE MODAL
const inputBoxes = document.querySelectorAll(".input-box");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal-form");
const modalMessage = document.querySelector(".modal-message");
const modalOverlay = document.getElementById("modalOverlay");
const confirmBtn = document.getElementById("confirm");
const cancelBtn = document.getElementById("cancel");

function openModal(action) {
  modalOverlay.style.display = "flex";

  if (action === "edit") {
    modalMessage.textContent = "Edit your notes or make new notes:";
    modalForm.style.display = "block";

    inputBoxes.forEach((inputBox) => {
      inputBox.style.display = "flex";
    });
  } else if (action === "delete") {
    modalMessage.textContent = "Are you sure you want to delete this book?";
    modalForm.style.display = "block";

    inputBoxes.forEach((inputBox) => {
      inputBox.style.display = "none";
    });
  }
}

cancelBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});
