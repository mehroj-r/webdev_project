describe("Email form functionality", () => {
  let emailInput, sendBtn, alertMock;

  beforeAll(() => {
    // Set up the DOM
    document.body.innerHTML = `
      <input id="email" type="email" />
      <button id="send-btn">Send</button>
    `;

    // Get references to elements
    emailInput = document.getElementById("email");
    sendBtn = document.getElementById("send-btn");

    alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    delete window.location;
    window.location = { href: "" };
    // Attach event listeners manually (instead of appending a script)
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

  beforeEach(() => {
    jest.clearAllMocks();
    window.location.href = "";
    emailInput.value = "";
  });

  // Test 1: Check if clicking send without entering an email shows an alert

  test("Clicking send without entering an email shows an alert", () => {
    sendBtn.click();
    expect(alertMock).toHaveBeenCalledWith("Please enter an email address.");
  });

  // Test 2: Check if clicking send with a valid email updates window.location.href correctly

  test("Clicking send with an email updates window.location.href", () => {
    emailInput.value = "test@example.com";
    sendBtn.click();
    expect(decodeURIComponent(window.location.href)).toBe(
      "mailto:a.qarshiboyev@newuu.uz?subject=New Uzbekation User&body=test@example.com"
    );
  });

  // Test 3: Check if the email input is cleared after clicking send
  
  test("Clicking send clears the email input", () => {
    emailInput.value = "test@example.com";
    sendBtn.click();
    expect(emailInput.value).toBe(""); 
  });
});
