document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  const nameInput = document.getElementById('nameInput');
  const phoneInput = document.getElementById('phoneInput');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  if (!form) return;

  function validateName() {
    const value = nameInput.value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!value) {
      nameError.textContent = 'Full name is required';
      nameError.classList.remove('hidden');
      return false;
    }

    if (!nameRegex.test(value)) {
      nameError.textContent =
        'Name should only contain letters and spaces';
      nameError.classList.remove('hidden');
      return false;
    }

    nameError.classList.add('hidden');
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const phoneRegex = /^[0-9]{10}$/;

    if (!value) {
      phoneError.textContent = 'Phone number is required';
      phoneError.classList.remove('hidden');
      return false;
    }

    if (!phoneRegex.test(value)) {
      phoneError.textContent =
        'Phone number must be exactly 10 digits';
      phoneError.classList.remove('hidden');
      return false;
    }

    phoneError.classList.add('hidden');
    return true;
  }

  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, '');
    validateName();
  });

  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value
      .replace(/\D/g, '')
      .slice(0, 10);

    validatePhone();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();

    if (!isNameValid || !isPhoneValid) {
      return;
    }

    const payload = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim()
    };

    try {
      await fetch(
        'YOUR_APPS_SCRIPT_WEB_APP_URL',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      form.reset();

      window.dispatchEvent(
        new CustomEvent('form-success')
      );

    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  });
});