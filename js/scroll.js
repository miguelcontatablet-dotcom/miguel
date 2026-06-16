/* ===========================================================
   scroll.js — scrollytelling + navegação ativa + progresso
   Usa IntersectionObserver (API nativa, sem libs)
   =========================================================== */

(function () {
  "use strict";

  /* ---- 1. Revelar elementos ao entrar na viewport ---- */
  var reveals = document.querySelectorAll(".reveal");
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(function (el) { revealObserver.observe(el); });

  /* ---- 2. Destacar o link de navegação da seção ativa ---- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");

  function setActive(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", isActive);
    });
  }

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { setActive(entry.target.id); }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(function (s) { navObserver.observe(s); });

  /* ---- 3. Barra de progresso de leitura ---- */
  var progressBar = document.getElementById("progressBar");
  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var pct = height > 0 ? (scrollTop / height) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---- 4. Menu mobile (toggle) ---- */
  var navToggle = document.getElementById("navToggle");
  var navLinksContainer = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    var open = navLinksContainer.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Fecha o menu ao clicar em um link (mobile)
  navLinksContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinksContainer.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
})();
