const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("emailInput").value
  const password = document.getElementById("passwordInput").value
  const phone = document.getElementById("phoneInput").value

  console.log(email, password, phone); 

  if (email && password) {
    localStorage.setItem(email, JSON.stringify({ password, phone }));
    alert("Sign-up successful! Please log in.");
    window.location.href = "./signin.html";
  } else {
    alert("Please enter email and password.");
  }
});
