document.getElementById("signupBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const phone = document.getElementById("phoneInput").value;

  if ( !name || !email || !password) {
    alert("Please fill in all fields.");
    return false;
  }

  // Check if the user already exists
  if (localStorage.getItem(email)) {
    alert("User already exists. Please use a different email or sign in to your acount!");
    return;
  }

  // Create a user object
  const user = { name, email, password, phone };

  // Save user object to localStorage
  localStorage.setItem(email, JSON.stringify(user));

  alert("Signup successful! You can now log in.");
  window.location.href = "./signin.html"; // Redirect to login page
});

