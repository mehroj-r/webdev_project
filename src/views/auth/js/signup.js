document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signupBtn").addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();
    const phone = document.getElementById("phoneInput").value.trim();

    if (!name || !email || !password) {
      showModal(
        "Error!",
        "Please fill in all fields.",
        "bg-mainpurple",
        "warning"
      );
      return false;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      showModal(
        "User Already Exists!",
        "Please use a different email or sign in to your account!",
        "bg-mainpurple",
        "warning"
      );
      return;
    }

    const newUser = { name, email, password, phone };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showModal(
      "Signup Successful!",
      "You can now log in.",
      "bg-mainpurple",
      "success"
    );

    setTimeout(() => {
      window.location.href = "./signin.html";
    }, 3000);
  });
});
