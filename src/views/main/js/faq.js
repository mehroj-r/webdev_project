function toggleFaq(event) {
  const parentFaq = event.currentTarget.closest(".faq");
  const answerBox = parentFaq.querySelector(".answer-box");

  if (parentFaq.classList.contains("active")) {
    answerBox.style.display = "none";
    parentFaq.classList.remove("active");
  } else {
    document.querySelectorAll(".faq").forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".answer-box").style.display = "none";
    });

    answerBox.style.display = "block";
    parentFaq.classList.add("active");
  }
}

document.querySelectorAll(".faq").forEach((faq) => {
  faq.addEventListener("click", toggleFaq);
});
