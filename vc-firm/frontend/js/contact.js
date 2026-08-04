document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initNewsletterForm();
});

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    const data = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      company: form.querySelector('[name="company"]').value,
      subject: form.querySelector('[name="subject"]').value,
      message: form.querySelector('[name="message"]').value,
    };
    try {
      await api.submitContact(data);
      showToast('Message sent successfully! We\'ll be in touch soon.');
      form.reset();
    } catch (err) {
      showToast('Failed to send message. Please try again or email us directly.', 'error');
    }
    btn.textContent = originalText;
    btn.disabled = false;
  });
}

function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    try {
      await api.subscribeNewsletter(email);
      showToast('Subscribed successfully!');
      form.reset();
    } catch (err) {
      showToast('Subscription failed. Please try again.', 'error');
    }
  });
}
