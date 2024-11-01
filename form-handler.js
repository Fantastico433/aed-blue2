document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("form-success");
    const formError = document.getElementById("form-error");

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if reCAPTCHA is verified
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert("Please complete the reCAPTCHA verification.");
            return;
        }

        const formData = new FormData(contactForm);
        formData.append("g-recaptcha-response", recaptchaResponse); // Add reCAPTCHA token

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData // Send data as FormData
            });

            if (response.ok) {
                formSuccess.style.display = "block";
                formError.style.display = "none";
                contactForm.reset(); // Clear form fields
                grecaptcha.reset(); // Reset reCAPTCHA after successful submission
            } else {
                formError.style.display = "block";
                formSuccess.style.display = "none";
            }
        } catch (error) {
            console.error("Error:", error);
            formError.style.display = "block";
            formSuccess.style.display = "none";
        }
    });
});
