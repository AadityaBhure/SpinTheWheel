const questions = [
  // 🟢 LEVEL 1 — Basics
  { title: "Q1. Basics", text: "What does CPU stand for?", answer: "central processing unit", marks: 2 },
  { title: "Q2. Basics", text: "What does RAM stand for?", answer: "random access memory", marks: 2 },
  { title: "Q3. Basics", text: "What does ROM stand for?", answer: "read only memory", marks: 2 },

  // 🟡 LEVEL 2 — Internet & Programming
  { title: "Q4. Internet", text: "What does URL stand for?", answer: "uniform resource locator", marks: 2 },
  { title: "Q5. Programming", text: "What symbol is used for single-line comments in C++?", answer: "//", marks: 2 },
  { title: "Q6. Programming", text: "Which keyword is used to define a function in Python?", answer: "def", marks: 2 },

  // 🟠 LEVEL 3 — Logic & Data
  { title: "Q7. Data Structures", text: "Which data structure uses FIFO order?", answer: "queue", marks: 3 },
  { title: "Q8. Data Structures", text: "Which data structure uses LIFO order?", answer: "stack", marks: 3 },
  { title: "Q9. Databases", text: "What does SQL stand for?", answer: "structured query language", marks: 3 },

  // 🔵 LEVEL 4 — Advanced & Coding Logic
  { title: "Q10. Logic", text: "In binary, what is 1010 + 0101?", answer: "1111", marks: 3 },
  { title: "Q11. OOP", text: "In OOP, what does 'inheritance' mean in one word?", answer: "reusability", marks: 3 },
  { title: "Q12. OOP", text: "What does the 'this' keyword refer to in most OOP languages?", answer: "current object", marks: 3 },

  // 🔴 LEVEL 5 — Theoretical / Hard
  { title: "Q13. Theory of Computation", text: "What does DFA stand for?", answer: "deterministic finite automaton", marks: 4 },
  { title: "Q14. OS", text: "What is the full form of PCB in Operating Systems?", answer: "process control block", marks: 4 },
  { title: "Q15. Networking", text: "What does IP stand for in networking?", answer: "internet protocol", marks: 4 }
];

let current = 0;
let correctCount = 0;
let totalMarks = 0;

const titleEl = document.getElementById("question-title");
const textEl = document.getElementById("question-text");
const inputEl = document.getElementById("answer-input");
const feedbackEl = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-btn");

// ⭐ Live score display
const scoreDisplay = document.createElement("div");
scoreDisplay.id = "score-display";
scoreDisplay.style.marginBottom = "15px";
scoreDisplay.style.fontWeight = "bold";
scoreDisplay.style.color = "#FFD700";
scoreDisplay.style.fontSize = "18px";
document.querySelector(".container").insertBefore(scoreDisplay, document.getElementById("quiz-box"));

function updateScoreDisplay() {
  const totalPossible = questions.reduce((sum, q) => sum + q.marks, 0);
  scoreDisplay.textContent = `⭐ Points: ${totalMarks} / ${totalPossible}`;
}

function cleanInput(str) {
  return str.trim().toLowerCase().replace(/[^\w\s\/]/g, "");
}

function loadQuestion() {
  const q = questions[current];
  titleEl.textContent = q.title;
  textEl.textContent = q.text;
  inputEl.value = "";
  feedbackEl.textContent = "";
  updateScoreDisplay();
}

function checkAnswer() {
  const userAns = cleanInput(inputEl.value);
  const correctAns = cleanInput(questions[current].answer);

  if (userAns === correctAns) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "#00ffae";
    correctCount++;
    totalMarks += questions[current].marks;
    updateScoreDisplay();
    current++;

    if (current < questions.length) {
      setTimeout(loadQuestion, 800);
    } else {
      setTimeout(showFinalScore, 700);
    }
  } else {
    feedbackEl.textContent = "❌ Try again!";
    feedbackEl.style.color = "#ff6b6b";
  }
}

function showFinalScore() {
  const totalPossible = questions.reduce((sum, q) => sum + q.marks, 0);

  document.getElementById("quiz-box").innerHTML = `
    <h2>🎉 Quiz Completed!</h2>
    <p>✅ Correct Answers: <strong>${correctCount}</strong> / ${questions.length}</p>
    <p>🏆 Marks Scored: <strong>${totalMarks}</strong> / ${totalPossible}</p>
    <button onclick="restartQuiz()">Restart</button>
  `;

  updateScoreDisplay();
}

function restartQuiz() {
  current = 0;
  correctCount = 0;
  totalMarks = 0;

  document.getElementById("quiz-box").innerHTML = `
    <h2 id="question-title"></h2>
    <p id="question-text"></p>
    <input id="answer-input" placeholder="Type your answer">
    <button id="submit-btn">Submit</button>
    <p id="feedback"></p>
  `;

  setTimeout(() => {
    const newBtn = document.getElementById("submit-btn");
    newBtn.addEventListener("click", checkAnswer);
    loadQuestion();
  }, 50);
}

submitBtn.addEventListener("click", checkAnswer);
loadQuestion();
