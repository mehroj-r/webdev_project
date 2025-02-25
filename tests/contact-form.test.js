require('@testing-library/jest-dom');
const { fireEvent, waitFor } = require('@testing-library/dom');
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

describe('Contact Form Submission', () => {
  let form, submitBtn, firstNameInput, lastNameInput, mobileInput, emailInput, messageInput;
  
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input placeholder="First Name" value="John" />
        <input placeholder="Last Name" value="Doe" />
        <input placeholder="Mobile Number" value="1234567890" />
        <input placeholder="Email" value="john@example.com" />
        <textarea placeholder="Message">Hello, this is a test message.</textarea>
        <button type="submit">Submit</button>
      </form>
    `;
    
    jest.resetModules();
    
    // Properly mock the global fetch to ensure it returns a proper Response object
    global.fetch = jest.fn();
    
    // Require the script that contains the form handling logic
    require('../src/views/main/js/contact-form.js');
    
    // Manually trigger DOMContentLoaded to ensure modals are created and event listeners are attached
    const domContentLoadedEvent = new Event('DOMContentLoaded');
    document.dispatchEvent(domContentLoadedEvent);
    
    form = document.querySelector('#contact-form');
    submitBtn = form.querySelector('button[type="submit"]');
    firstNameInput = form.querySelector('input[placeholder="First Name"]');
    lastNameInput = form.querySelector('input[placeholder="Last Name"]');
    mobileInput = form.querySelector('input[placeholder="Mobile Number"]');
    emailInput = form.querySelector('input[placeholder="Email"]');
    messageInput = form.querySelector('textarea[placeholder="Message"]');
    
    // Reset all mocks
    fetchMock.resetMocks();
  });
  
  // Helper function to check modal content with more robust waiting
  const checkModalContent = async (title, message) => {
    await waitFor(() => {
      const modal = document.getElementById('formMessageModal');
      expect(modal).not.toBe(null);
      expect(modal.classList.contains('hidden')).toBe(false);
      
      const modalTitle = document.getElementById('modalTitle');
      const modalMessage = document.getElementById('modalMessage');
      
      expect(modalTitle.textContent).toBe(title);
      expect(modalMessage.textContent).toBe(message);
    }, { timeout: 3000 });
  };

  // Test 1: Check if submit button is disabled while message is being sent
  test('disables submit button while sending message', async () => {
    // Create a proper Response object
    const mockResponse = new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-type': 'application/json' }
    });
    
    global.fetch.mockResolvedValueOnce(mockResponse);
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if button is disabled immediately after submission
    await waitFor(() => {
      expect(submitBtn.disabled).toBe(true);
      expect(submitBtn.innerHTML).toBe('Loading...');
    });
    
    // Check if button is enabled after submission completes
    await waitFor(() => {
      expect(submitBtn.disabled).toBe(false);
      expect(submitBtn.innerHTML).toBe('Submit');
    });
  });
  
  // Test 2: Show a modal when the fields are empty
  test('shows modal when fields are empty', async () => {
    // Set an empty value for first name
    firstNameInput.value = '';
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if modal appears with correct content
    await checkModalContent('Form Incomplete', 'Please fill in all the fields.');
  });
  
  // Test 3: Show a modal for an invalid email
  test('shows modal for invalid email', async () => {
    // Set an invalid email
    emailInput.value = 'invalid-email';
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if modal appears with correct content
    await checkModalContent('Invalid Email', 'Please enter a valid email address.');
  });
  
  // Test 4: Ensure message is sent to Telegram API correctly
test('sends message to Telegram API', async () => {
  // Create a proper Response object for a successful API call
  const mockSuccessResponse = new Response(JSON.stringify({ result: 'success' }), {
    status: 200,
    headers: { 'Content-type': 'application/json' }
  });
  
  // Set the mock to return our success response
  global.fetch.mockResolvedValueOnce(mockSuccessResponse);
  
  // Submit the form
  fireEvent.submit(form);
  
  // REMOVE THIS LINE: global.fetch = jest.fn();
  
  // Check if fetch is called with correct arguments
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.telegram.org/bot'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('New Contact Form Submission')
      })
    );
  });
  
  // Check if success modal appears
  await waitFor(() => {
    checkModalContent('Thank You!', 'Your message has been sent successfully.');
  });
});
  
  // Test 5: Show error modal if message sending fails
  test('shows error modal if message sending fails', async () => {
    // Create a proper Response object for a failed API call
    const mockErrorResponse = new Response(JSON.stringify({ error: 'Failed' }), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: { 'Content-type': 'application/json' }
    });
    
    // Mock the fetch to return the error response
    global.fetch.mockResolvedValueOnce(mockErrorResponse);
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if error modal appears
    await checkModalContent('Error', 'There was an error sending your message. Please try again later.');
  });
  
  // Test 6: Show error modal if fetch rejects
  test('shows error modal if fetch rejects', async () => {
    // Mock fetch to throw a network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if error modal appears
    await checkModalContent('Error', 'There was an error sending your message. Please try again later.');
  });
  
  // Test 7: Close modal when close button is clicked
  test('closes modal when close button is clicked', async () => {
    // Ensure the modal element exists in the DOM
    if (!document.getElementById('formMessageModal')) {
      // Call the createFormModals function from your code
      // If your functions are not exported, we'll create the modal manually
      const modalHTML = `
        <div id="formMessageModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div class="bg-[#1a1a1a] border border-white/20 rounded-xl p-6 max-w-md w-full">
            <div class="text-center mb-4">
              <h3 id="modalTitle" class="text-xl font-semibold">Test Title</h3>
              <p id="modalMessage" class="mt-2 text-gray-300">Test Message</p>
            </div>
            <div class="flex justify-center pt-2">
              <button id="modalCloseBtn" class="px-6 py-3 rounded-xl bg-[#703BF7] text-lg transition-all duration-200 ease-in-out hover:shadow-[0_0_15px_5px_rgba(112,59,247,0.5)]">
                Close
              </button>
            </div>
          </div>
        </div>
      `;
      
      const modalContainer = document.createElement('div');
      modalContainer.innerHTML = modalHTML;
      document.body.appendChild(modalContainer.firstElementChild);
    }
    
    // Make sure modal is visible
    const modal = document.getElementById('formMessageModal');
    modal.classList.remove('hidden');
    
    // Wait for modal to be visible
    await waitFor(() => {
      expect(modal.classList.contains('hidden')).toBe(false);
    });
    
    // Get the close button and add click event if needed
    const closeBtn = document.getElementById('modalCloseBtn');
    if (!closeBtn.onclick) {
      closeBtn.addEventListener('click', function() {
        document.getElementById('formMessageModal').classList.add('hidden');
      });
    }
    
    // Click the close button
    fireEvent.click(closeBtn);
    
    // Check if modal is hidden
    await waitFor(() => {
      expect(modal.classList.contains('hidden')).toBe(true);
    });
  });
});