/* ===========================================================
   quiz.js — quiz final
   Carrega perguntas de data/quiz.json, controla pontuação e resultado.
   Obs.: o fetch exige servir via HTTP (não abrir como file://).
   =========================================================== */

(function () {
  "use strict";

  var container = document.getElementById("quizContainer");
  if (!container) return;

  var data = null;
  var index = 0;
  var score = 0;
  var answered = false;

  fetch("data/quiz.json")
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (json) {
      data = json;
      renderQuestion();
    })
    .catch(function () {
      container.innerHTML =
        '<p class="quiz-loading">Não foi possível carregar o quiz. ' +
        "Abra o site por um servidor local (ex.: <code>python -m http.server</code>) " +
        "em vez de abrir o arquivo diretamente.</p>";
    });

  function renderQuestion() {
    answered = false;
    var item = data.questions[index];
    var total = data.questions.length;

    var html = '<p class="quiz-progress">Pergunta ' + (index + 1) + " de " + total + "</p>";
    html += '<div class="quiz-question"><h3>' + escapeHtml(item.q) + "</h3>";
    item.options.forEach(function (opt, i) {
      html += '<button class="quiz-option" data-i="' + i + '">' + escapeHtml(opt) + "</button>";
    });
    html += "</div>";
    container.innerHTML = html;

    var optionButtons = container.querySelectorAll(".quiz-option");
    optionButtons.forEach(function (btn) {
      btn.addEventListener("click", function () { handleAnswer(btn, item, optionButtons); });
    });
  }

  function handleAnswer(btn, item, optionButtons) {
    if (answered) return;
    answered = true;

    var chosen = parseInt(btn.getAttribute("data-i"), 10);
    var correct = item.answer;

    optionButtons.forEach(function (b) {
      var i = parseInt(b.getAttribute("data-i"), 10);
      b.disabled = true;
      if (i === correct) b.classList.add("correct");
      if (i === chosen && chosen !== correct) b.classList.add("wrong");
    });

    if (chosen === correct) score++;

    var isLast = index === data.questions.length - 1;
    var nextBtn = document.createElement("button");
    nextBtn.className = "quiz-next";
    nextBtn.textContent = isLast ? "Ver resultado" : "Próxima pergunta";
    nextBtn.addEventListener("click", function () {
      if (isLast) { renderResult(); } else { index++; renderQuestion(); }
    });
    container.querySelector(".quiz-question").appendChild(nextBtn);
  }

  function renderResult() {
    var total = data.questions.length;
    var result = data.results[0];
    data.results.forEach(function (r) { if (score >= r.min) result = r; });

    container.innerHTML =
      '<div class="quiz-result">' +
      '<p class="quiz-progress">Resultado</p>' +
      '<div class="score">' + score + "/" + total + "</div>" +
      "<h3>" + escapeHtml(result.title) + "</h3>" +
      "<p>" + escapeHtml(result.msg) + "</p>" +
      '<button class="quiz-restart">Jogar novamente</button>' +
      "</div>";

    container.querySelector(".quiz-restart").addEventListener("click", function () {
      index = 0; score = 0; renderQuestion();
    });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();
