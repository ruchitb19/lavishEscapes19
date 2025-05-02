document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    //  Contact Form Submission
    document.getElementById("contactForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;
        const destination = document.getElementById("destination").value;

        const statusMessage = document.getElementById("statusMessage");

        try {
            const response = await fetch("http://localhost:5000/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message, phone, destination }),
            });

            const result = await response.json();
            if (response.ok) {
                statusMessage.textContent = "Message sent successfully!";
                statusMessage.classList.remove("hidden", "text-red-500");
                statusMessage.classList.add("text-green-500");
                document.getElementById("contactForm").reset();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            statusMessage.textContent = "Failed to send message. Try again.";
            statusMessage.classList.remove("hidden", "text-green-500");
            statusMessage.classList.add("text-red-500");
        }
    });
})