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

.animate-move {
    animation: moveBg 26s infinite ease-in-out;
}

.animate-move-reverse {
    animation: moveReverseBg 26s infinite ease-in-out;
}

`;

document.head.appendChild(element);

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
locationBtn.addEventListener("mouseenter", showModal);
locationModal.addEventListener("mouseenter", () => {
  clearTimeout(hideTimeout); 
});
locationModal.addEventListener("mouseleave", hideModal);
