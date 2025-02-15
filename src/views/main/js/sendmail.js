document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const sendBtn = document.getElementById("send-btn");

  emailIcon.addEventListener("click", function () {
    emailInput.focus();
  });

  sendBtn.addEventListener("click", function () {
    const emailValue = emailInput.value.trim();

    if (emailValue === "") {
      alert("Please enter an email address.");
      return;
    }

    window.location.href = `mailto:a.qarshiboyev@newuu.uz?subject=New Uzbekation User&body=${emailValue}`;

    emailInput.value = "";
  });
});
