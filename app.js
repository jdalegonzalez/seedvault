// ── Configuration ───────────────────────────────────────
// Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxw8fSWzDZxKZri1xG9t2IOeKZZWpEXqhxe7N4WeDM1IT98F5rsQj973pHHv7PogrY7AA/exec';

// ── DOM References ──────────────────────────────────────
const overlay = document.getElementById('formOverlay');
const formView = document.getElementById('formView');
const successView = document.getElementById('successView');
const formTitle = document.getElementById('formTitle');
const formDesc = document.getElementById('formDesc');
const userTypeInput = document.getElementById('userType');
const submitBtn = document.getElementById('submitBtn');
const waitlistForm = document.getElementById('waitlistForm');

// ── Form Management ─────────────────────────────────────
function openForm(type) {
  userTypeInput.value = type;

  if (type === 'vendor') {
    formTitle.textContent = 'Join the Vendor Waitlist';
    formDesc.textContent = "Get funded, supported, and connected to Atlanta's biggest hospitality buyers.";
    submitBtn.className = 'btn btn--primary vendor';
    document.getElementById('company').placeholder = 'Local Farm Co.';
  } else {
    formTitle.textContent = 'Join the Buyer Waitlist';
    formDesc.textContent = 'Access verified local vendors with zero procurement fees and full insurance.';
    submitBtn.className = 'btn btn--primary buyer';
    document.getElementById('company').placeholder = 'Atlanta Hotel Group';
  }

  formView.style.display = 'block';
  successView.style.display = 'none';
  waitlistForm.reset();
  userTypeInput.value = type;
  overlay.classList.add('active');
}

function closeForm(event) {
  if (event && event.target !== overlay) return;
  overlay.classList.remove('active');
  waitlistForm.reset();
}

// ── Form Submission ─────────────────────────────────────
async function submitForm(event) {
  event.preventDefault();

  // Gather form data
  const formData = {
    name: document.getElementById('name').value.trim(),
    company: document.getElementById('company').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    userType: userTypeInput.value,
    timestamp: new Date().toISOString()
  };

  // Disable submit while sending
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    if (GOOGLE_SCRIPT_URL) {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } else {
      // No Google Script URL configured — log locally
      console.log('Lead captured (no Google Sheet configured):', formData);
    }

    // Show success
    formView.style.display = 'none';
    successView.style.display = 'block';

    // Auto-close after 3 seconds
    setTimeout(() => {
      overlay.classList.remove('active');
      formView.style.display = 'block';
      successView.style.display = 'none';
      waitlistForm.reset();
    }, 3000);

  } catch (err) {
    console.error('Submission error:', err);
    // Still show success to the user at the kiosk — log error for later review
    formView.style.display = 'none';
    successView.style.display = 'block';
    setTimeout(() => {
      overlay.classList.remove('active');
      formView.style.display = 'block';
      successView.style.display = 'none';
      waitlistForm.reset();
    }, 3000);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Join Waitlist';
  }
}
