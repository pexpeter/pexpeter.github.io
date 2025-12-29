/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Form submission feedback
    initFormFeedback('contactForm', 'formFeedback');
    initFormFeedback('contactFormBlog', 'formFeedbackBlog');

});

// Form submission with feedback
function initFormFeedback(formId, feedbackId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const submitText = submitBtn.querySelector('.submit-text');
        const submitLoading = submitBtn.querySelector('.submit-loading');
        const feedback = document.getElementById(feedbackId);

        // Show loading state
        if (submitText && submitLoading) {
            submitText.style.display = 'none';
            submitLoading.style.display = 'inline';
        }
        submitBtn.disabled = true;

        // The form will submit naturally, but we provide visual feedback
        setTimeout(() => {
            if (feedback) {
                feedback.style.display = 'block';
                const alert = feedback.querySelector('.alert');
                alert.className = 'alert alert-info';
                alert.style.background = 'rgba(45, 212, 191, 0.1)';
                alert.style.border = '1px solid rgba(45, 212, 191, 0.3)';
                alert.style.color = '#2dd4bf';
                alert.textContent = 'Submitting your message...';
            }
        }, 100);
    });
}