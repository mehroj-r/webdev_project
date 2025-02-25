try {
  function checkAuth() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("You must be logged in to buy a ticket.");
      window.location.href = "../auth/signin.html"; // Redirect to login page
      return; // Stop further execution
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
  const loggedInUser = localStorage.getItem("loggedInUser");
  const profileLink = document.getElementById("profileLink");
  const profileIconContainer = document.getElementById("profileIconContainer");

  if (profileLink && profileIconContainer) {
    if (loggedInUser) {
      // User is signed in, show profile icon
      profileLink.href = "./profile.html";
      profileIconContainer.innerHTML = `<img src="./img/profile.svg" alt="profile">`;
    } else {
      // User is NOT signed in, show sign-in icon (SVG)
      profileLink.href = "../auth/signin.html";
      profileIconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#A685FA"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
      </svg>
      `;
    }
  }
});
