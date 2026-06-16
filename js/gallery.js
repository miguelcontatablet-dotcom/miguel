/* ===========================================================
   gallery.js — lightbox simples para a galeria de imagens
   =========================================================== */

(function () {
  "use strict";

  var gallery = document.getElementById("gallery");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var closeBtn = document.getElementById("lightboxClose");

  if (!gallery || !lightbox) return;

  var lastFocused = null;

  function openLightbox(full, caption, alt) {
    lastFocused = document.activeElement;
    lightboxImg.src = full;
    lightboxImg.alt = alt || caption || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  gallery.addEventListener("click", function (e) {
    var item = e.target.closest(".gallery-item");
    if (!item) return;
    var img = item.querySelector("img");
    openLightbox(item.getAttribute("data-full"), item.getAttribute("data-caption"), img ? img.alt : "");
  });

  closeBtn.addEventListener("click", closeLightbox);

  // Clique no fundo escuro fecha
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Tecla ESC fecha
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();
