function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.querySelector('#contact-form').addEventListener('submit', async function(event) {
event.preventDefault(); 

const submitBtn = document.querySelector('#contact-form button[type="submit"]');

submitBtn.disabled = true;
const originalBtnContent = submitBtn.innerHTML;
submitBtn.innerHTML = `Loading...`;

const firstName = document.querySelector('input[placeholder="First Name"]').value.trim();
const lastName = document.querySelector('input[placeholder="Last Name"]').value.trim();
const mobileNumber = document.querySelector('input[placeholder="Mobile Number"]').value.trim();
const email = document.querySelector('input[placeholder="Email"]').value.trim();
const message = document.querySelector('textarea[placeholder="Message"]').value.trim();

if (!firstName || !lastName || !mobileNumber || !email || !message) {
    alert('Please fill in all the fields.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;
    return;
}

if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
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
const botToken = 'Bot_token';
const chatId = '5509719862';

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
    alert('Thank you for your message!');
    event.target.reset(); 
    } else {
    console.error('Failed to send message', response.statusText);
    alert('There was an error sending your message. Please try again later.');
    }
} catch (error) {
    console.error('Error sending message:', error);
    alert('There was an error sending your message. Please try again later.');
} finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;
}
});