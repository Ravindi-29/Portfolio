/* =========================================
   1. Mobile Navigation Menu Toggle 
========================================= */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle the dropdown menu on hamburger click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Automatically close the mobile menu when an anchor link is clicked
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});


/* =========================================
   2. Contact Form Validation Logic
========================================= */
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMsg = document.getElementById('success-msg');

// Helper function: Display error state
function showError(inputElement, message) {
    // Select the wrapper .form-group
    const formGroup = inputElement.parentElement;
    formGroup.classList.add('error');

    // Select error message span and update text
    const errorDisplay = formGroup.querySelector('.error-msg');
    errorDisplay.innerText = message;
}

// Helper function: Clear error state
function clearError(inputElement) {
    const formGroup = inputElement.parentElement;
    formGroup.classList.remove('error');
}

// Helper function: Check email via Regular Expression
function isValidEmail(email) {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
}

// Listen to the form's submit event
form.addEventListener('submit', function (e) {
    // Prevent default form submission behavior (page reload)
    e.preventDefault();

    let isFormValid = true;

    // Validate Name Field
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isFormValid = false;
    } else {
        clearError(nameInput);
    }

    // Validate Email Field
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isFormValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isFormValid = false;
    } else {
        clearError(emailInput);
    }

    // Validate Message Field
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message cannot be blank');
        isFormValid = false;
    } else {
        clearError(messageInput);
    }

    // Success State
    if (isFormValid) {
        // Show success message
        successMsg.style.display = 'block';

        // Reset/Empty the inputs
        form.reset();

        // Hide the success message automatically after 3.5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3500);
    }
});
