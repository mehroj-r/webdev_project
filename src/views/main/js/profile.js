document.addEventListener("DOMContentLoaded", () => {
  handleLogOut();
  fillFields();
});

const fillFields = () => {
  const loggedInEmail = localStorage.getItem("loggedInUser"); // Get logged-in user's email
  const users = JSON.parse(localStorage.getItem("users")) || []; // Get all users

  if (!loggedInEmail) {
    window.location.href = "../auth/signin.html"; // Redirect if not logged in
    return;
  }

  // Find the logged-in user in the users array
  const user = users.find((user) => user.email === loggedInEmail);

  if (user) {
    document.getElementById("nameInput").value = user.name || ""; 
    document.getElementById("emailInput").value = user.email || ""; 
    document.getElementById("passwordInput").value = user.password || ""; 
    document.getElementById("phoneInput").value = user.phone || ""; 
  } else {
    // If user is not found, clear session and redirect
    localStorage.removeItem("loggedInUser");
    window.location.href = "../auth/signin.html";
  }
};

const handleLogOut = () => {
  const showModalBtn = document.getElementById("showModalBtn");
  const logoutModal = document.getElementById("logoutModal");
  const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  if (!showModalBtn || !logoutModal || !confirmLogoutBtn || !cancelBtn) {
    console.error("One or more modal elements not found.");
    return;
  }

  // Show modal when clicking log out button in profile page
  showModalBtn.addEventListener("click", function () {
    logoutModal.classList.remove("hidden");
  });

  // Hide modal when clicking cancel button
  cancelBtn.addEventListener("click", function () {
    logoutModal.classList.add("hidden");
  });

  // Perform logout when clicking confirm log out button inside modal
  confirmLogoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser"); // Remove session
    window.location.href = "./home.html"; // Redirect to login page
  });
};
