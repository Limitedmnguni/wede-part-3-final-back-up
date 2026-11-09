document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // 2. Reveal animations and hover lift effects
    document.querySelectorAll("header, main section, .service-item-card, .service-filter-btn, img").forEach((el, index) => {
        if (el.tagName === "IMG" || el.classList.contains("service-filter-btn") || el.classList.contains("service-item-card") || el.tagName === "SECTION" || el.tagName === "HEADER") {
            el.classList.add("animate-reveal");
            el.style.transitionDelay = `${index * 80}ms`;
            if (el.classList.contains("service-item-card") || el.classList.contains("service-filter-btn")) {
                el.classList.add("hover-lift");
            }
        }
    });

    const revealItems = document.querySelectorAll(".animate-reveal");
    if (revealItems.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        revealItems.forEach((item) => revealObserver.observe(item));
    }

    // 3. Interactive Service Filter (on services.html)
    const filterButtons = document.querySelectorAll(".service-filter-btn");
    const serviceCards = document.querySelectorAll(".service-item-card");

    if (filterButtons.length > 0) {
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterButtons.forEach((b) => {
                    b.classList.remove("bg-primary", "text-on-primary");
                    b.classList.add("bg-transparent", "text-primary");
                });
                btn.classList.remove("bg-transparent", "text-primary");
                btn.classList.add("bg-primary", "text-on-primary");

                const category = btn.getAttribute("data-filter");
                serviceCards.forEach((card) => {
                    if (category === "all" || card.getAttribute("data-category") === category) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }
                });
            });
        });
    }

    // 3. Client-Side Form Validation (on enquiry.html)
    const enquiryForm = document.getElementById("fitment-enquiry-form");
    const formFeedback = document.getElementById("form-feedback");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const vehicleModel = document.getElementById("vehicleModel").value.trim();
            const selectedServices = document.querySelectorAll('input[name="service"]:checked');

            const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
            const cleanPhone = phone.replace(/\s+/g, "");

            let errors = [];

            if (fullName.length < 2) {
                errors.push("Please enter your full name.");
            }
            if (!phoneRegex.test(cleanPhone)) {
                errors.push("Please enter a valid South African phone number (e.g., 082 123 4567).");
            }
            if (!email.includes("@") || !email.includes(".")) {
                errors.push("Please enter a valid email address.");
            }
            if (vehicleModel.length < 2) {
                errors.push("Please specify your vehicle make and model.");
            }
            if (selectedServices.length === 0) {
                errors.push("Please select at least one required service.");
            }

            formFeedback.classList.remove("hidden", "bg-error-container", "text-on-error-container", "bg-surface-container-high", "text-primary");

            if (errors.length > 0) {
                formFeedback.classList.add("bg-error-container", "text-on-error-container");
                formFeedback.innerHTML = `<strong>Please fix the following errors:</strong><ul class="list-disc pl-5 mt-1">${errors.map(err => `<li>${err}</li>`).join("")}</ul>`;
            } else {
                formFeedback.classList.add("bg-surface-container-high", "text-primary");
                formFeedback.innerHTML = `<strong>Enquiry Received!</strong> Thank you, ${fullName}. Our team at 25 Melville Road, Pelham, Pietermaritzburg will contact you shortly regarding your ${vehicleModel}.`;
                enquiryForm.reset();
            }
        });
    }
});