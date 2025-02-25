function toggleFaq(event) {
  const parentFaq = event.currentTarget.closest(".faq");
  const answerBox = parentFaq.querySelector(".answer-box");

  if (parentFaq.classList.contains("active")) {
    // Start the collapse animation by setting opacity to 0
    answerBox.style.opacity = "0";
    answerBox.style.marginTop = "0";
    
    // After a short delay, remove the active class which will trigger the height animation
    setTimeout(() => {
      parentFaq.classList.remove("active");
    }, 100);
  } else {
    // Close any open FAQs first
    document.querySelectorAll(".faq.active").forEach((activeFaq) => {
      const activeAnswerBox = activeFaq.querySelector(".answer-box");
      activeAnswerBox.style.opacity = "0";
      activeAnswerBox.style.marginTop = "0";
      
      setTimeout(() => {
        activeFaq.classList.remove("active");
      }, 100);
    });

    // Then open the clicked FAQ
    setTimeout(() => {
      parentFaq.classList.add("active");
      // Trigger fade in after active class is added
      setTimeout(() => {
        answerBox.style.opacity = "1";
        answerBox.style.marginTop = "20px";
      }, 50);
    }, 200);
  }

  // Prevent the click from propagating to parent elements
  event.stopPropagation();
}

// Attach click event to FAQs
document.querySelectorAll(".faq").forEach((faq) => {
  faq.addEventListener("click", toggleFaq);
});