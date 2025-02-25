document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal");
  let currentIndex = 0;

  function showModal(index) {
    modals.forEach((modal, i) => {
      modal.classList.remove("active", "exit-left", "enter-right");

      if (i === index) {
        modal.classList.add("active");
      } else if (i < index) {
        modal.classList.add("exit-left");
      } else {
        modal.classList.add("enter-right");
      }
    });
  }

  document.querySelectorAll("#nextBtn").forEach((button) => {
    button.addEventListener("click", function () {
      let currentModal = this.closest(".modal"); // Find the closest modal
      let nextModal = currentModal.nextElementSibling; // Get the next modal

      if (nextModal && nextModal.classList.contains("modal")) {
        currentModal.classList.remove("active"); // Hide current modal
        nextModal.classList.add("active"); // Show next modal
      }
    });
  });

  document.querySelectorAll("#backBtn").forEach((button) => {
    button.addEventListener("click", function () {
      let currentModal = this.closest(".modal"); // Find the closest modal
      let prevModal = currentModal.previousElementSibling; // Get the previous modal

      if (prevModal && prevModal.classList.contains("modal")) {
        currentModal.classList.remove("active"); // Hide current modal
        prevModal.classList.add("active"); // Show previous modal
      }
    });
  });
});

document.querySelectorAll(".payment-option").forEach((option) => {
  option.addEventListener("click", function () {
    document
      .querySelectorAll(".payment-option")
      .forEach((opt) => opt.classList.remove("selected"));
    this.classList.add("selected");
  });
});

document
  .getElementById("paymentOptions")
  .addEventListener("click", function (event) {
    let selectedOption = event.target.closest(".payment-option");
    if (!selectedOption) return; // Ignore clicks outside of options

    // Remove "selected" class from all payment options
    document.querySelectorAll(".payment-option").forEach((option) => {
      option.classList.remove("selected");
    });

    // Add "selected" class to the clicked option
    selectedOption.classList.add("selected");
  });

document.getElementById("payBtn").addEventListener("click", function () {
  let currentModal = this.closest(".modal"); // Find the current modal
  let successModal = document.getElementById("successModal"); // Modal for successful payment
  let failModal = document.getElementById("failModal"); // Modal for unsuccessful payment

  let isPaymentSelected =
    document.querySelector(".payment-option.selected") !== null;

  if (isPaymentSelected) {
    currentModal.classList.remove("active");
    successModal.classList.add("active"); // Show success modal
  } else {
    currentModal.classList.remove("active");
    failModal.classList.add("active"); // Show failure modal
  }
});

