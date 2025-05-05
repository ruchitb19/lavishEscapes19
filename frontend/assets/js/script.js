document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    //  Perfect Escape form Submission
    const form = document.querySelector(".tour-search-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Collect form data
        const destination = document.getElementById("destination").value.trim();
        const people = document.getElementById("people").value.trim();
        const checkin = document.getElementById("tourCheckin").value;
        const checkout = document.getElementById("tourCheckout").value;

        // Construct data object
        const formData = {
            destination,
            people: parseInt(people),
            checkin,
            checkout,
            inquiryDate: new Date().toISOString(), // Optional: track when the request was made
        };

        try {
            const response = await fetch("https://fy97qxmtm6.execute-api.ap-south-1.amazonaws.com/prod/escape-inquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Your inquiry has been submitted successfully!");
                form.reset();
            } else {
                const errMsg = await response.text();
                alert("Failed to submit inquiry. " + errMsg);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred while submitting your inquiry. Please try again later.");
        }
    });



    //  Vehicle Rental form Submission
    const vehicleForm = document.querySelector(".vehicle-search-form");

    vehicleForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const pickupLocation = document.getElementById("pickupLocation").value.trim();
        const guests = parseInt(document.getElementById("vehicleGuests").value.trim());
        const rentIn = document.getElementById("rentIn").value;
        const rentOut = document.getElementById("rentOut").value;

        const vehicleData = {
            pickupLocation,
            guests,
            rentIn,
            rentOut,
            inquiryDate: new Date().toISOString()
        };

        try {
            const response = await fetch("https://fy97qxmtm6.execute-api.ap-south-1.amazonaws.com/prod/vehicle-inquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vehicleData),
            });

            if (response.ok) {
                alert("Your vehicle rental inquiry has been submitted successfully!");
                vehicleForm.reset();
            } else {
                const errMsg = await response.text();
                alert("Failed to submit vehicle inquiry. " + errMsg);
            }
        } catch (error) {
            console.error("Vehicle inquiry submission error:", error);
            alert("An error occurred while submitting your vehicle rental inquiry. Please try again later.");
        }
    });


    //  Contact Form Submission
    document.getElementById("contactForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();
        const destination = document.getElementById("destination").value;

        const statusMessage = document.getElementById("statusMessage");

        try {
            const response = await fetch("https://fy97qxmtm6.execute-api.ap-south-1.amazonaws.com/prod/contact-us", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message, phone, destination }),
            });

            const result = await response.json();

            if (response.ok) {
                document.getElementById("contactForm").reset();
                statusMessage.textContent = "Your message is received. Our team will contact you soon.";
                statusMessage.classList.remove("hidden", "text-red-500");
                statusMessage.classList.add("text-green-500");
            } else {
                throw new Error(result.message || "Unexpected error");
            }
            setTimeout(() => {
                statusMessage.classList.add("hidden");
            }, 5000); // hides after 5 seconds

        } catch (error) {
            statusMessage.textContent = "Failed to send message. Please try again.";
            statusMessage.classList.remove("hidden", "text-green-500");
            statusMessage.classList.add("text-red-500");
        }
    });


    // NewsLetter form Submission
    document.getElementById("newsletterForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("newsletterEmail").value.trim();
        const status = document.getElementById("newsletterStatus");

        try {
            const response = await fetch("https://fy97qxmtm6.execute-api.ap-south-1.amazonaws.com/prod/newsletter-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const result = await response.json();

            if (response.ok) {
                status.textContent = "Thank you for subscribing!";
                status.classList.remove("hidden", "text-red-500");
                status.classList.add("text-green-300");
                document.getElementById("newsletterForm").reset();
            } else {
                throw new Error(result.message || "Failed to subscribe.");
            }
        } catch (error) {
            status.textContent = "Subscription failed. Please try again.";
            status.classList.remove("hidden", "text-green-300");
            status.classList.add("text-red-500");
        }

        setTimeout(() => status.classList.add("hidden"), 5000); // hide message after 5s
    });
})
