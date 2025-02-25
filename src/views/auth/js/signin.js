document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.getElementById("signinBtn");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  signInBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((u) => u.email === email);

    if (!user) {
      showModal(
        "Error!",
        "No account found linked to this email! <br> If you don't have an account, please sign up!",
        "bg-mainpurple",
        "warning"
      );
      return;
    }

    if (user.password !== password) {
      showModal(
        "Incorrect Password!",
        "The password you entered is incorrect. Please try again.",
        "bg-mainpurple",
        "warning"
      );
      return;
    }

    // Save logged-in user's email
    localStorage.setItem("loggedInUser", email);

    showModal(
      "Success!",
      "Login successful! Redirecting to your dashboard...",
      "bg-mainpurple",
      "success"
    );

    setTimeout(() => {
      window.location.href = "../main/home.html";
    }, 3000);
  });
});
