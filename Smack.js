// ===== 1. LIGHTBOX FOR GALLERY (IMAGE VIEWER) =====
function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'block';
    lightboxImg.src = imgElement.src;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// ===== 2. FORM VALIDATION =====
function validateForm(event) {
    event.preventDefault(); // Stop form from submitting if validation fails

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));

    let isValid = true;

    // Get form values
    const fullname = document.getElementById('fullname').value.trim();
    const dob = document.getElementById('dob').value;
    const parent = document.getElementById('parent').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const studentClass = document.getElementById('class').value;

    // Validate fullname
    if (fullname === '') {
        showError('fullname', 'fullnameError', 'Full name is required.');
        isValid = false;
    } else if (fullname.length < 3) {
        showError('fullname', 'fullnameError', 'Name must be at least 3 characters.');
        isValid = false;
    }

    // Validate date of birth
    if (dob === '') {
        showError('dob', 'dobError', 'Date of birth is required.');
        isValid = false;
    }

    // Validate parent name
    if (parent === '') {
        showError('parent', 'parentError', 'Parent/Guardian name is required.');
        isValid = false;
    }

    // Validate phone (Ugandan format: starts with 0 or +256, digits only)
    const phoneRegex = /^(\+256|0)[0-9]{9}$/;
    if (phone === '') {
        showError('phone', 'phoneError', 'Phone number is required.');
        isValid = false;
    } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        showError('phone', 'phoneError', 'Enter a valid Ugandan phone number (e.g., +256700123456 or 0700123456).');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('email', 'emailError', 'Email address is required.');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'emailError', 'Enter a valid email address.');
        isValid = false;
    }

    // Validate class selection
    if (studentClass === '') {
        showError('class', 'classError', 'Please select a class.');
        isValid = false;
    }

    // If all valid, show success and reset form
    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('registrationForm').reset();
        // Hide success message after 5 seconds
        setTimeout(function() {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }

    return isValid;
}

function showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add('error-border');
    document.getElementById(errorId).textContent = message;
}

// ===== 3. DYNAMIC WELCOME GREETING (appears on all pages) =====
document.addEventListener('DOMContentLoaded', function() {
    // Create greeting element
    const greetingDiv = document.createElement('div');
    greetingDiv.style.cssText = `
        background-color: #f0c040;
        color: #0a2e5c;
        text-align: center;
        padding: 10px;
        font-weight: bold;
        font-size: 1rem;
    `;

    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) {
        greeting = '☀️ Good Morning! Welcome to SMACK.';
    } else if (hour < 17) {
        greeting = '🌤️ Good Afternoon! Welcome to SMACK.';
    } else {
        greeting = '🌙 Good Evening! Welcome to SMACK.';
    }

    greetingDiv.textContent = greeting;

    // Insert right after the nav
    const nav = document.querySelector('nav');
    nav.parentNode.insertBefore(greetingDiv, nav.nextSibling);

    // ===== BONUS: Slide show for Gallery Page =====
    // Automatically cycles images in gallery page if present
    const galleryImages = document.querySelectorAll('#gallery img');
    if (galleryImages.length > 0) {
        // Double-click to start slideshow
        let slideInterval;
        let currentSlide = 0;

        document.getElementById('gallery').addEventListener('dblclick', function() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
                alert('Slideshow stopped.');
            } else {
                slideInterval = setInterval(function() {
                    openLightbox(galleryImages[currentSlide]);
                    currentSlide = (currentSlide + 1) % galleryImages.length;
                }, 2000);
                alert('Slideshow started! Double-click gallery to stop.');
            }
        });
    }
});