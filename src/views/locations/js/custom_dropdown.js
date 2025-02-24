document.addEventListener("DOMContentLoaded", () => {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((customSelect) => {
    const selectButton = customSelect.querySelector(".select-button");
    const dropdown = customSelect.querySelector(".select-dropdown");
    const options = dropdown.querySelectorAll("li");
    const selectedValue = selectButton.querySelector(".selected-value");

    // Store the default text from the span when the page loads
    const defaultText = selectedValue.textContent.trim();

    const toggleDropdown = (expand = null) => {
      const isOpen =
        expand !== null ? expand : dropdown.classList.contains("hidden");
      dropdown.classList.toggle("hidden", !isOpen);
      selectButton.setAttribute("aria-expanded", isOpen);
    };

    const handleOptionSelect = (option) => {
      options.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");

      if (option.dataset.value === "clear") {
        selectedValue.textContent = defaultText; // Reset to initial text
      } else {
        selectedValue.textContent = option.textContent.trim();
      }
    };

    options.forEach((option) => {
      option.addEventListener("click", () => {
        handleOptionSelect(option);
        toggleDropdown(false);
      });
    });

    selectButton.addEventListener("click", () => {
      toggleDropdown();
    });

    document.addEventListener("click", (event) => {
      if (!customSelect.contains(event.target)) {
        toggleDropdown(false);
      }
    });
  });
});
