
/* ============ Mobile Menu Toggle ============ */
(() => {
  const btn = document.querySelector('.nav-toggle');
  const list = document.querySelector('nav ul');
  if (!btn || !list) return;

  btn.addEventListener('click', () => {
    const isShown = list.classList.toggle('show');
    btn.setAttribute('aria-expanded', String(isShown));
  });
})();

/* ============ Quiz Scoring (optional enhancement) ============ */
/* Assumes: <form id="history-quiz">, q1 text, q2..q4 radios, q5 checkboxes, q6 radios,
   and an output element <p id="quiz-result"> */
(() => {
  const form = document.querySelector('form#history-quiz');
  if (!form) return;

  const out = document.getElementById('quiz-result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let score = 0;

    const answers = {
      q1: "WorldWideWeb",
      q2: "1991",
      q3: "NCSA",
      q4: "JavaScript",
      q5: ["HTML", "CSS", "JavaScript"],
      q6: "info.cern.ch"
    };

    const valText = name =>
      (form.elements[name]?.value || "").trim().toLowerCase();

    const valRadio = name =>
      (form.elements[name]?.value || "");

    // q1 text
    if (valText("q1") === answers.q1.toLowerCase()) score++;

    // q2, q3, q4 radios
    ["q2","q3","q4"].forEach(q => { if (valRadio(q) === answers[q]) score++; });

    // q5 checkboxes
    const selected = Array.from(form.querySelectorAll('input[name="q5"]:checked')).map(i => i.value);
    const allCorrect = answers.q5.every(a => selected.includes(a)) && selected.every(s => answers.q5.includes(s));
    if (allCorrect) score++;

    // q6 radio
    if (valRadio("q6") === answers.q6) score++;

    if (out) {
      out.textContent = `Score: ${score} / 6`;
      out.setAttribute('aria-live', 'polite');
    }
  });

  form.addEventListener('reset', () => {
    if (out) out.textContent = '';
  });
})();