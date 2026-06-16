/* ===========================================================
   audio.js — player de trechos das faixas
   Um único <audio> compartilhado; tocar uma faixa pausa a anterior.
   =========================================================== */

(function () {
  "use strict";

  var player = document.getElementById("audioPlayer");
  var bar = document.getElementById("audioBar");
  var toggleBtn = document.getElementById("audioToggle");
  var nowLabel = document.getElementById("audioNow");
  var progressFill = document.getElementById("audioProgressFill");
  var closeBtn = document.getElementById("audioClose");
  var tracks = Array.prototype.slice.call(document.querySelectorAll(".track"));

  var currentTrack = null;

  function resetTrackUI(track) {
    if (!track) return;
    track.classList.remove("playing");
    track.querySelector(".track-play").textContent = "▶";
    var fill = track.querySelector(".track-bar-fill");
    if (fill) fill.style.width = "0%";
  }

  function playTrack(track) {
    var src = track.getAttribute("data-audio");
    var title = track.querySelector("h3").childNodes[0].textContent.trim();

    // Se clicar na faixa que já está tocando -> alterna pausa/play
    if (currentTrack === track && !player.paused) {
      player.pause();
      return;
    }
    if (currentTrack === track && player.paused) {
      player.play();
      return;
    }

    // Troca de faixa
    if (currentTrack) resetTrackUI(currentTrack);
    currentTrack = track;
    player.src = src;
    nowLabel.textContent = title;
    bar.hidden = false;

    var p = player.play();
    if (p && typeof p.catch === "function") {
      p.catch(function () {
        // Arquivo de áudio ausente/placeholder: feedback discreto
        nowLabel.textContent = title + " (áudio indisponível)";
      });
    }
  }

  tracks.forEach(function (track) {
    var btn = track.querySelector(".track-play");
    btn.addEventListener("click", function () { playTrack(track); });
  });

  /* ---- Sincroniza UI com o estado do <audio> ---- */
  player.addEventListener("play", function () {
    if (!currentTrack) return;
    currentTrack.classList.add("playing");
    currentTrack.querySelector(".track-play").textContent = "⏸";
    toggleBtn.textContent = "⏸";
    toggleBtn.setAttribute("aria-label", "Pausar");
  });

  player.addEventListener("pause", function () {
    if (!currentTrack) return;
    currentTrack.querySelector(".track-play").textContent = "▶";
    toggleBtn.textContent = "▶";
    toggleBtn.setAttribute("aria-label", "Tocar");
  });

  player.addEventListener("timeupdate", function () {
    if (!currentTrack || !player.duration) return;
    var pct = (player.currentTime / player.duration) * 100;
    progressFill.style.width = pct + "%";
    var trackFill = currentTrack.querySelector(".track-bar-fill");
    if (trackFill) trackFill.style.width = pct + "%";
  });

  player.addEventListener("ended", function () {
    resetTrackUI(currentTrack);
    progressFill.style.width = "0%";
  });

  /* ---- Controles da barra fixa ---- */
  toggleBtn.addEventListener("click", function () {
    if (player.paused) { player.play(); } else { player.pause(); }
  });

  closeBtn.addEventListener("click", function () {
    player.pause();
    player.removeAttribute("src");
    player.load();
    resetTrackUI(currentTrack);
    currentTrack = null;
    bar.hidden = true;
  });
})();
