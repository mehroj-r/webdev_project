document.getElementById("signinBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    alert("Login successful!");

    // Save logged-in user email to localStorage
    localStorage.setItem("loggedInUser", email);

    window.location.href = "../main/home.html"; // Redirect to home page
  } else {
    alert("Invalid email or password.");
  }
});
