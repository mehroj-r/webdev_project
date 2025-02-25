try {
  function checkAuth() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      // Show the authentication modal instead of alert
      const authModal = document.getElementById("authModal");
      const goToSignIn = document.getElementById("goToSignIn");

      authModal.classList.remove("hidden"); // Show modal

      // Redirect to sign-in page when button is clicked
      goToSignIn.addEventListener("click", function () {
        const currentPage = window.location.pathname.split("/").pop(); // Get current page file name

        if (currentPage === "payment.html") {
          window.location.href = "../../auth/signin.html";
        } else {
          window.location.href = "../auth/signin.html";
        }
      });

      return false; // Stop further execution
    }
    return true; // User is signed in
  }

  function doPayment() {
    if (checkAuth()) {
      window.location.href = "../locations/payment/payment.html"; // Redirect to payment page if signed in
    }
  }
} catch (err) {
  console.log(err);
}

document.addEventListener("DOMContentLoaded", function () {
  const loggedInEmail = localStorage.getItem("loggedInUser"); // Store only email as identifier
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const profileLink = document.getElementById("profileLink");
  const profileIconContainer = document.getElementById("profileIconContainer");

  if (profileLink && profileIconContainer) {
    if (loggedInEmail) {
      // Find the logged-in user from the users array
      const loggedInUser = users.find((user) => user.email === loggedInEmail);

      if (loggedInUser) {
        profileLink.href = "./profile.html";
        profileIconContainer.innerHTML = `<img src="./img/profile.svg" alt="profile">`;
      } else {
        // If no matching user is found (corrupt data or deleted account)
        localStorage.removeItem("loggedInUser");
        profileLink.href = "../auth/signin.html";
        profileIconContainer.innerHTML = getSignInIcon();
      }
    } else {
      // User is NOT signed in, show sign-in icon
      profileLink.href = "../auth/signin.html";
      profileIconContainer.innerHTML = getSignInIcon();
    }
  }

  function getSignInIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#A685FA"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
      </svg>
    `;
  }
});
