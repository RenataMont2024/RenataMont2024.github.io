document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status'); // Get the status element

    if (contactForm && formStatus) { // Check if both elements exist
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(contactForm);
        formStatus.textContent = 'Sending...'; // Provide feedback
        formStatus.style.color = '#555'; // Neutral color while sending

        fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
              'Accept': 'application/json' // Request JSON response from Formspree
          }
        }).then(response => {
          if (response.ok) {
            // Success
            formStatus.textContent = "Благодариме што не контактиравте!";
            formStatus.style.color = 'green';
            contactForm.reset(); // Clear the form
            setTimeout(() => { // Clear message after a delay
              formStatus.textContent = '';
            }, 5000);
          } else {
            // Handle server errors (e.g., Formspree config issue)
            response.json().then(data => {
              if (Object.hasOwn(data, 'errors')) {
                formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
              } else {
                formStatus.textContent = "Oops! There was a problem submitting your form";
              }
              formStatus.style.color = 'red';
            })
          }
        }).catch(error => {
          // Handle network errors
          formStatus.textContent = "Oops! There was a network problem submitting your form";
          formStatus.style.color = 'red';
          console.error('Form submission error:', error);
        });
      });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('header nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight || 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                 top: offsetPosition,
                 behavior: "smooth"
            });
          }
        }
      });
    });

  });
