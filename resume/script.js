document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileMenu();
  initTypingEffect();
  initScrollReveal();
  initMouseGlow();
  initParticles();
  initTiltCards();
  initLoader();
  initContactForm();
  setCurrentYearState();
});

function initThemeToggle() {
  const root = document.documentElement;
  const toggleButton = document.querySelector("[data-theme-toggle]");
  const toggleLabel = document.querySelector(".toggle-label");

  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemDark ? "dark" : "light");

  root.setAttribute("data-theme", initialTheme);
  updateThemeText(initialTheme, toggleLabel, toggleButton);

  if (!toggleButton) return;

  toggleButton.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeText(nextTheme, toggleLabel, toggleButton);
  });
}

function updateThemeText(theme, label, button) {
  if (label) {
    label.textContent = theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode";
  }

  if (button) {
    button.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navToggle || !navPanel) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("open");
    navToggle.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      navPanel.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  });
}

function initTypingEffect() {
  const typedText = document.querySelector(".typed-text");
  if (!typedText) return;

  const roles = JSON.parse(typedText.getAttribute("data-roles") || "[]");
  if (!roles.length) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typedText.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1300);
        return;
      }
    } else {
      typedText.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = isDeleting ? 60 : 110;
    setTimeout(typeLoop, speed);
  }

  typeLoop();
}

function initScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initMouseGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow || window.innerWidth < 768) return;

  document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    glow.style.transform = `translate(${x - 140}px, ${y - 140}px)`;
  });
}

function initParticles() {
  const particleContainers = document.querySelectorAll(".particles");

  particleContainers.forEach((container) => {
    if (!container) return;

    for (let i = 0; i < 18; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";

      const size = Math.random() * 8 + 4;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 10 + 10;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      container.appendChild(particle);
    }
  });
}

function initTiltCards() {
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

function initLoader() {
  const loader = document.querySelector(".page-loader");
  if (!loader) return;

  window.addEventListener("load", () => {
    loader.classList.add("loaded");
    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form || typeof emailjs === "undefined") return;

  /*
    Replace these with your real EmailJS values:
    - YOUR_PUBLIC_KEY
    - YOUR_SERVICE_ID
    - YOUR_TEMPLATE_ID

    Also configure your EmailJS template variables as:
    from_name
    from_email
    subject
    message

    Your receiving email is set inside your EmailJS dashboard/template settings.
  */
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });

  const statusText = form.querySelector(".form-status");
  const submitButton = form.querySelector(".submit-btn");
  const buttonText = form.querySelector(".btn-text");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const isValid = validateForm(form);
    if (!isValid) {
      showFormStatus("Please fill in all required fields correctly.", "error", statusText);
      return;
    }

    submitButton.disabled = true;
    submitButton.classList.add("loading");
    buttonText.textContent = "Sending...";
    showFormStatus("Sending your message...", "info", statusText);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form
      );

      showFormStatus("Message sent successfully. I will get back to you soon.", "success", statusText);
      form.reset();
      clearErrors(form);
    } catch (error) {
      showFormStatus("Message could not be sent. Please try again after checking EmailJS settings.", "error", statusText);
      console.error("EmailJS Error:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("loading");
      buttonText.textContent = "Submit Message";
    }
  });
}

function validateForm(form) {
  let valid = true;
  const fields = form.querySelectorAll("input[required], textarea[required]");

  fields.forEach((field) => {
    const errorElement = field.parentElement.querySelector(".error-text");
    const value = field.value.trim();

    if (!value) {
      errorElement.textContent = `${getFieldLabel(field)} is required.`;
      field.classList.add("input-error");
      valid = false;
      return;
    }

    if (field.type === "email" && !isValidEmail(value)) {
      errorElement.textContent = "Please enter a valid email address.";
      field.classList.add("input-error");
      valid = false;
      return;
    }

    errorElement.textContent = "";
    field.classList.remove("input-error");
  });

  return valid;
}

function clearErrors(form) {
  const fields = form.querySelectorAll("input, textarea");

  fields.forEach((field) => {
    field.classList.remove("input-error");
    const errorElement = field.parentElement.querySelector(".error-text");
    if (errorElement) {
      errorElement.textContent = "";
    }
  });
}

function getFieldLabel(field) {
  const label = field.parentElement.querySelector("label");
  return label ? label.textContent : "This field";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormStatus(message, type, statusElement) {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.className = `form-status ${type}`;
}

function setCurrentYearState() {
  const yearElements = document.querySelectorAll("[data-current-year]");
  const year = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = year;
  });
}