function toggleFaq(event) {
  const parentFaq = event.currentTarget.closest(".faq");
  const answerBox = parentFaq.querySelector(".answer-box");

  if (parentFaq.classList.contains("active")) {
    answerBox.style.display = "none";
    parentFaq.classList.remove("active");
  } else {
    // Close other open FAQs
    document.querySelectorAll(".faq").forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".answer-box").style.display = "none";
    });

    answerBox.style.display = "block";
    parentFaq.classList.add("active");
  }
}

// Attach event listener to all FAQ questions and arrows
document.querySelectorAll(".faq").forEach((faq) => {
  faq.addEventListener("click", toggleFaq);
});
