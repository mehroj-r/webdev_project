document.getElementById("signinBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    document.cookie = `user=${email}; path=/; max-age=86400`; // saving session cookie for 1 day
    alert("Login successful!");
    window.location.href = "../main/home.html"; // Redirect to a protected page
  } else {
    alert("Invalid email or password.");
  }
});
