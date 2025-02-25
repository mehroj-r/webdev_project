require('@testing-library/jest-dom');
const { fireEvent, waitFor } = require('@testing-library/dom');
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();
describe('Contact Form Submission', () => {
  let form, submitBtn, firstNameInput, lastNameInput, mobileInput, emailInput, messageInput;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input placeholder="First Name" type="text" value="John"/>
        <input placeholder="Last Name" type="text" value="Doe"/>
        <input placeholder="Mobile Number" type="text" value="1234567890"/>
        <input placeholder="Email" type="email" value="test@example.com"/>
        <textarea placeholder="Message">Hello, this is a test message.</textarea>
        <button type="submit">Submit</button>
      </form>
    `;
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    jest.resetModules();
    require('../src/views/main/js/contact-form.js');


    form = document.querySelector('#contact-form');
    submitBtn = form.querySelector('button[type="submit"]');
    firstNameInput = form.querySelector('input[placeholder="First Name"]');
    lastNameInput = form.querySelector('input[placeholder="Last Name"]');
    mobileInput = form.querySelector('input[placeholder="Mobile Number"]');
    emailInput = form.querySelector('input[placeholder="Email"]');
    messageInput = form.querySelector('textarea[placeholder="Message"]');

    fetchMock.resetMocks();
  });

  // Test 1: Check if submit button is disabled while message is being sent

  test('disables submit button while sending message', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ ok: true }));

    fireEvent.submit(form);

    expect(submitBtn).toBeDisabled();

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
  });

    // Test 2: Show an alert when the fields are empty

  test('shows alert when fields are empty', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    firstNameInput.value = '';
    fireEvent.submit(form);

    expect(window.alert).toHaveBeenCalledWith('Please fill in all the fields.');
  });

  // Test 3: Show an alert for an invalid email

  test('shows alert for invalid email', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    emailInput.value = 'invalid-email';
    fireEvent.submit(form);

    expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');
  });

   // Test 4: Ensure message is sent to Telegram API correctly

  test('sends message to Telegram API', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ ok: true }));

    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('https://api.telegram.org/botBot_token/sendMessage'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"text":"📩 <b>New Contact Form Submission</b> 📩')
        })
      );
    });
  });

  // Test 5: Show error alert if message sending fails

  test('shows error alert if message sending fails', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    fetchMock.mockRejectedValueOnce(new Error('Failed to send'));

    fireEvent.submit(form);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('There was an error sending your message. Please try again later.');
    });
  });
});
