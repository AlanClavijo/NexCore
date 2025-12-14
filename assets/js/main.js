/**
 * ============================================================================
 * PROYECTO: NexCore Solutions - Scripts Principales
 * DESCRIPCIÓN: Carrusel, Scroll, Modales, Scroll Reveal y Lógica de Formularios.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
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
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // === 3. LÓGICA DEL PANEL DE NOTICIAS (MODAL LATERAL) ===
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

  // === 5. MANEJO DE FORMULARIOS Y MODAL DE ÉXITO (NUEVO) ===
  const forms = document.querySelectorAll("form");

  // Crear el HTML del modal dinámicamente si no existe
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

  // Función para cerrar modal
  closeModalBtn.addEventListener("click", () => {
    successModal.classList.remove("active");
  });

  // Cerrar al hacer clic fuera
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) successModal.classList.remove("active");
  });

  // Interceptar todos los envíos de formularios
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Evita recargar la página

      // Detectar tipo de formulario para personalizar mensaje
      let titleText = "¡Mensaje Enviado!";
      let msgText =
        "Gracias por contactarnos. Nuestro equipo te responderá a la brevedad.";

      // 1. Es formulario de Newsletter (Footer)?
      if (form.closest(".newsletter-form")) {
        titleText = "¡Suscripción Exitosa!";
        msgText =
          "Gracias por unirte. Recibirás nuestras novedades y oportunidades pronto.";
      }
      // 2. Es formulario de Reclutamiento?
      else if (form.classList.contains("recruit-form")) {
        titleText = "¡Postulación Recibida!";
        msgText =
          "Hemos recibido tu CV correctamente. El equipo de RRHH lo revisará pronto.";
      }

      // Actualizar textos
      modalTitle.textContent = titleText;
      modalMsg.textContent = msgText;

      // Mostrar modal
      successModal.classList.add("active");

      // Opcional: Limpiar el formulario
      form.reset();
    });
  });

  // Lógica extra para el input file de reclutamiento (si existe)
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
});
