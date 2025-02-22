try {
  const element = document.createElement("style");
  element.innerHTML = `
  @keyframes moveBg {
    0% { transform: translate(0px, 10px); }
    15% { transform: translate(20px, -20px); }
    25% { transform: translate(50px, -40px); }
    35% { transform: translate(70px, 20px); }
    45% { transform: translate(50px, 60px); }
    55% { transform: translate(0px, 80px); }
    65% { transform: translate(-50px, 60px); }
    75% { transform: translate(-70px, 20px); }
    85% { transform: translate(-50px, -40px); }
    100% { transform: translate(0px, 10px); }
}

@keyframes moveReverseBg {
    0% { transform: translate(0px, 10px); }
    15% { transform: translate(-50px, -40px); }
    25% { transform: translate(-70px, 20px); }
    35% { transform: translate(-50px, 60px); }
    45% { transform: translate(0px, 80px); }
    55% { transform: translate(50px, 60px); }
    65% { transform: translate(70px, 20px); }
    75% { transform: translate(50px, -40px); }
    85% { transform: translate(20px, -20px); }
    100% { transform: translate(0px, 10px); }
}

@keyframes bell {
    0%, 100% { transform: rotate(0deg); }  /* Normal */
    25% { transform: rotate(10deg); }     /* Ring right */
    50% { transform: rotate(-10deg); }    /* Ring left */
    75% { transform: rotate(10deg); }     /* Ring right */
  }

  .animate-bell {
    animation: bell 1s ease-in-out infinite; /* Rings every 2s */
  }

.animate-move {
    animation: moveBg 26s infinite ease-in-out;
}

.animate-move-reverse {
    animation: moveReverseBg 26s infinite ease-in-out;
}
`;
  document.head.appendChild(element);
} catch (err) {
  console.log(err);
}

try {
  const locationBtn = document.getElementById("locationBtn");
  const locationModal = document.getElementById("locationModal");
  let hideTimeout;
  function showModal() {
    locationModal.classList.remove("hidden");
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      if (!locationModal.matches(":hover")) {
        hideModal();
      }
    }, 2000);
  }
  function hideModal() {
    locationModal.classList.add("hidden");
  }

  locationBtn.addEventListener("click", showModal);
  locationModal.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
  });
  locationModal.addEventListener("mouseleave", hideModal);
} catch (err) {
  console.log(err);
}

try {
  function openCityPage(cityName) {
    let url = `../locations/${cityName.toLowerCase()}.html`; // Convert to lowercase and format the URL
    window.location.href = url;
  }
} catch (err) {
  console.log(err);
}

document.addEventListener("DOMContentLoaded", function () {
  let links = document.querySelectorAll(".nav-link");
  let currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", ""); // Extracts 'services' from 'services.html'

  console.log(`Current page detected: ${currentPage}`);

  links.forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
      console.log(`Active class added to: ${link.textContent}`);
    }
  });
});

try {
  window.onload = function () {
    const hash = window.location.hash; 
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100); 
        }
    }
};
} catch (err) {
  console.log(err);
  
}