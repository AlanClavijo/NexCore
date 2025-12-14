/**
 * ============================================================================
 * PROYECTO: NexCore Solutions - Scripts Principales
 * DESCRIPCIÓN: Carrusel, Scroll, Modales, Scroll Reveal, Formularios y Menú Móvil.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // === 0. MENÚ MÓVIL ===
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");

  if (navToggle && navWrapper) {
    navToggle.addEventListener("click", () => {
      navWrapper.classList.toggle("active");

      // Cambiar icono de hamburguesa a X
      const icon = navToggle.querySelector("i");
      if (navWrapper.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // === 1. LÓGICA DEL CARRUSEL DE HÉROE ===
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  const slideInterval = 5000;

  function nextSlide() {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
  }

  // === 2. SCROLL SUAVE ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") return;

      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      // Cerrar menú móvil si está abierto
      if (navWrapper && navWrapper.classList.contains("active")) {
        navWrapper.classList.remove("active");
        const icon = navToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // === 3. PANEL DE NOTICIAS ===
  const openNewsBtn = document.getElementById("open-news-panel");
  const closeNewsBtn = document.getElementById("close-news-panel");
  const newsPanel = document.getElementById("news-panel");

  if (openNewsBtn && newsPanel) {
    openNewsBtn.addEventListener("click", () =>
      newsPanel.classList.add("active")
    );
    if (closeNewsBtn)
      closeNewsBtn.addEventListener("click", () =>
        newsPanel.classList.remove("active")
      );
    newsPanel.addEventListener("click", (e) => {
      if (e.target === newsPanel) newsPanel.classList.remove("active");
    });
  }

  // === 4. ANIMACIÓN SCROLL REVEAL ===
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    var windowHeight = window.innerHeight;
    var elementVisible = 150;

    for (var i = 0; i < reveals.length; i++) {
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementBottom = reveals[i].getBoundingClientRect().bottom;

      if (elementTop < windowHeight - elementVisible && elementBottom > 0) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);
  reveal();

  // === 5. FORMULARIOS Y MODAL ===
  const forms = document.querySelectorAll("form");

  if (!document.getElementById("success-modal")) {
    const modalHTML = `
      <div id="success-modal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-icon-box">
            <i class="fas fa-check"></i>
          </div>
          <h3 class="modal-title" id="modal-title">¡Enviado!</h3>
          <p class="modal-message" id="modal-msg">Hemos recibido tu información correctamente.</p>
          <button id="close-modal-btn" class="modal-btn-close">Entendido</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  const successModal = document.getElementById("success-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalMsg = document.getElementById("modal-msg");

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      successModal.classList.remove("active");
    });
  }

  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) successModal.classList.remove("active");
    });
  }

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let titleText = "¡Mensaje Enviado!";
      let msgText =
        "Gracias por contactarnos. Nuestro equipo te responderá a la brevedad.";

      if (form.closest(".newsletter-form")) {
        titleText = "¡Suscripción Exitosa!";
        msgText =
          "Gracias por unirte. Recibirás nuestras novedades y oportunidades pronto.";
      } else if (form.classList.contains("recruit-form")) {
        titleText = "¡Postulación Recibida!";
        msgText =
          "Hemos recibido tu CV correctamente. El equipo de RRHH lo revisará pronto.";
      }

      if (modalTitle) modalTitle.textContent = titleText;
      if (modalMsg) modalMsg.textContent = msgText;
      if (successModal) successModal.classList.add("active");
      form.reset();
    });
  });

  const fileInput = document.querySelector(".file-input");
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      var fileName = this.files[0]?.name;
      var msgElement = this.parentElement.querySelector(".file-msg");
      if (fileName && msgElement) {
        msgElement.textContent = "Archivo seleccionado: " + fileName;
        msgElement.style.color = "#ea5b0c";
        msgElement.style.fontWeight = "bold";
      }
    });
  }

  // === 6. INDICADOR DE PESTAÑA ACTIVA (NUEVO) ===
  // Detecta la URL actual y añade la clase 'active-link' al menú correspondiente
  const currentLocation = location.href;
  const menuItems = document.querySelectorAll(".menu-bar a");

  menuItems.forEach((link) => {
    if (link.href === currentLocation) {
      link.classList.add("active-link");
    }
  });
});
