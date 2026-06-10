// =========================
// Reveal on Scroll
// =========================

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
});


// =========================
// Active Navbar Link
// =========================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


// =========================
// Navbar Shrink on Scroll
// =========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

// =========================
// Contact Form
// =========================

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector("textarea").value.trim();
    const button = contactForm.querySelector("button");

    button.textContent = "Sending...";
    button.disabled = true;

    try {
        const response = await fetch(
            "https://bhyetsy16f.execute-api.ap-southeast-2.amazonaws.com/contact",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            }
        );

        if (response.ok) {
            button.textContent = "Message Sent ✓";
            button.style.background = "#16a34a";
            contactForm.reset();
        } else {
            throw new Error("Failed");
        }

    } catch (err) {
        button.textContent = "Failed. Try Again";
        button.style.background = "#dc2626";
        button.disabled = false;
    }

});