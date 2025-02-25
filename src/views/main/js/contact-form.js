// File: js/contact-form.js

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Create modal elements for form messages
function createFormModals() {
    // Create modal container if it doesn't exist
    if (!document.getElementById('formMessageModal')) {
        const modalHTML = `
            <div id="formMessageModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
                <div class="bg-[#1a1a1a] border border-white/20 rounded-xl p-6 max-w-md w-full">
                    <div class="text-center mb-4">
                        <h3 id="modalTitle" class="text-xl font-semibold"></h3>
                        <p id="modalMessage" class="mt-2 text-gray-300"></p>
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
        
        // Add event listener to close modal
        document.getElementById('modalCloseBtn').addEventListener('click', function() {
            document.getElementById('formMessageModal').classList.add('hidden');
        });
    }
}

// Show custom modal with message
function showModal(title, message) {
    createFormModals();
    const modal = document.getElementById('formMessageModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modal.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    // Create modals on page load
    createFormModals();
    
    const contactForm = document.querySelector('#contact-form');
    
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `Loading...`;

        const firstName = this.querySelector('input[placeholder="First Name"]').value.trim();
        const lastName = this.querySelector('input[placeholder="Last Name"]').value.trim();
        const mobileNumber = this.querySelector('input[placeholder="Mobile Number"]').value.trim();
        const email = this.querySelector('input[placeholder="Email"]').value.trim();
        const message = this.querySelector('textarea[placeholder="Message"]').value.trim();

        if (!firstName || !lastName || !mobileNumber || !email || !message) {
            showModal('Form Incomplete', 'Please fill in all the fields.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            return;
        }

        if (!isValidEmail(email)) {
            showModal('Invalid Email', 'Please enter a valid email address.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            return;
        }

        const text = `📩 <b>New Contact Form Submission</b> 📩\n\n`
                + `👤 <b>First Name:</b> ${firstName}\n`
                + `👥 <b>Last Name:</b> ${lastName}\n`
                + `📞 <b>Mobile Number:</b> ${mobileNumber}\n`
                + `✉️ <b>Email:</b> ${email}\n`
                + `📝 <b>Message:</b>\n${message}`;
        
        const botToken = 'BOT_TOKEN';
        const chatId = 'CHAT_ID';

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                console.log('Message sent successfully');
                showModal('Thank You!', 'Your message has been sent successfully.');
                event.target.reset(); 
            } else {
                console.error('Failed to send message', response.statusText);
                showModal('Error', 'There was an error sending your message. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            showModal('Error', 'There was an error sending your message. Please try again later.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
});