/**
 * @jest-environment jsdom
 */
const { fireEvent } = require("@testing-library/dom");

beforeEach(() => {
  document.body.innerHTML = `
    <form id="signinForm">
      <input type="email" id="emailInput" />
      <input type="password" id="passwordInput" />
      <button type="submit" id="signinBtn">Sign In</button>
    </form>
  `;

  jest.spyOn(window, "alert").mockImplementation(() => {});

  document.getElementById("signinForm").addEventListener("submit", function (event) {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    if (!email || !password) {
      event.preventDefault(); 
      alert("Please enter both email and password.");
    } else {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", email);
    }
  });
});

//Test Case: Alert should be shown when email or password field is empty.

test("Alert when email or password is empty", () => {
  const form = document.getElementById("signinForm");

  fireEvent.submit(form);

  expect(window.alert).toHaveBeenCalledWith("Please enter both email and password.");
});

//Test Case: Successful login should show an alert and store the email in localStorage

test("Successful login when credentials are provided", () => {
  // Set values for email and password
  document.getElementById("emailInput").value = "test@example.com";
  document.getElementById("passwordInput").value = "123456";

  const form = document.getElementById("signinForm");
  fireEvent.submit(form);
  expect(window.alert).toHaveBeenCalledWith("Login successful!");
  expect(localStorage.getItem("loggedInUser")).toBe("test@example.com");
});
