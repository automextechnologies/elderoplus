document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  const nameInput = document.getElementById('nameInput');
  const phoneInput = document.getElementById('phoneInput');
  const remindersInput = document.getElementById('remindersInput');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  if (!form) return;

  function validateName() {
    const value = nameInput.value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!value) {
      nameError.textContent = 'Full name is required';
      nameError.classList.remove('hidden');
      nameInput.classList.add('border-red-500', 'focus:ring-red-500');
      nameInput.classList.remove('border-orange-200', 'focus:ring-brand-orange');
      return false;
    }

    if (!nameRegex.test(value)) {
      nameError.textContent = 'Name should only contain letters and spaces';
      nameError.classList.remove('hidden');
      nameInput.classList.add('border-red-500', 'focus:ring-red-500');
      nameInput.classList.remove('border-orange-200', 'focus:ring-brand-orange');
      return false;
    }

    nameError.classList.add('hidden');
    nameInput.classList.remove('border-red-500', 'focus:ring-red-500');
    nameInput.classList.add('border-orange-200', 'focus:ring-brand-orange');
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const phoneRegex = /^[0-9]{10}$/;

    if (!value) {
      phoneError.textContent = 'Phone number is required';
      phoneError.classList.remove('hidden');
      phoneInput.classList.add('border-red-500', 'focus:ring-red-500');
      phoneInput.classList.remove('border-orange-200', 'focus:ring-brand-orange');
      return false;
    }

    if (!phoneRegex.test(value)) {
      phoneError.textContent = 'Phone number must be exactly 10 digits';
      phoneError.classList.remove('hidden');
      phoneInput.classList.add('border-red-500', 'focus:ring-red-500');
      phoneInput.classList.remove('border-orange-200', 'focus:ring-brand-orange');
      return false;
    }

    phoneError.classList.add('hidden');
    phoneInput.classList.remove('border-red-500', 'focus:ring-red-500');
    phoneInput.classList.add('border-orange-200', 'focus:ring-brand-orange');
    return true;
  }

  // Real-time input filtering
  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, '');
    validateName();
  });

  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    validatePhone();
  });

  // Reset error styles and texts
  function resetFormErrors() {
    nameError.classList.add('hidden');
    phoneError.classList.add('hidden');
    nameInput.classList.remove('border-red-500', 'focus:ring-red-500');
    nameInput.classList.add('border-orange-200', 'focus:ring-brand-orange');
    phoneInput.classList.remove('border-red-500', 'focus:ring-red-500');
    phoneInput.classList.add('border-orange-200', 'focus:ring-brand-orange');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();

    if (!isNameValid || !isPhoneValid) {
      return;
    }

    const payload = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      reminders: remindersInput ? remindersInput.checked : false
    };

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbxbrEt0NOF4GUF_XMVLYb0IsrwSvAchCo5ai6JjjR0PCph880EW4mufav7bvQaPPYne/exec',
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
      resetFormErrors();

      window.dispatchEvent(
        new CustomEvent('form-success')
      );

    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  });

  // Listen to Alpine's form reset to clean up errors if Register Another Account is clicked
  window.addEventListener('click', (e) => {
    if (e.target.closest('[x-show="formSubmitted"] button')) {
      resetFormErrors();
    }
  });
});