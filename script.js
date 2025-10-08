const questions = [
  // 🧑‍💻 Technical
  {
    title: "Q1. Technical",
    text: `What does this print?<br><pre>a = [1,2,3]\nb = a[:]\nb.append(4)\nprint(a, b)</pre>`,
    answer: "[1, 2, 3] [1, 2, 3, 4]"
  },
  {
    title: "Q2. Technical",
    text: `What is the output of:<br><pre>for i in range(1,6):\n   if i%2==0: continue\n   print(i, end="")</pre>`,
    answer: "135"
  },
  {
    title: "Q3. Technical (C)",
    text: `What does this print?<br><pre>char str[] = "HELLO";\nprintf("%c", ++*str);</pre>`,
    answer: "I"
  },

  // 🧠 Logical Reasoning
  {
    title: "Q4. Logical",
    text: `Five people P, Q, R, S, T are standing in line. Q is not next to R; P is between S and Q. Who is at the center?`,
    answer: "P"
  },
  {
    title: "Q5. Logical / Ages",
    text: `A is 2 years older than B, and B is twice as old as C. If total age sum is 27, find A, B, C.`,
    answer: "A=12,B=10,C=5"
  },
  {
    title: "Q6. Logical / Pattern",
    text: `If 2 + 3 = 10, 8 + 4 = 96, 6 + 5 = 66, then 7 + 3 = ?`,
    answer: "70"
  },

  // 📊 Aptitude
  {
    title: "Q7. Aptitude / Work",
    text: `A, B, and C can complete a work in 20, 30, and 60 days respectively. All start together; A leaves after 2 days, and B leaves 3 days before completion. Find total days to finish.`,
    answer: "20"
  },
  {
    title: "Q8. Aptitude / Algebra",
    text: `The sum of a number and its reciprocal is 13/6. Find the number(s). (Answer as fraction like 2/3 or 3/2)`,
    answer: "2/3 or 3/2"
  },
  {
    title: "Q9. Aptitude / Compound Interest",
    text: `A sum amounts to ₹9261 in 3 years at 10% compound interest (annual). Find the principal.`,
    answer: "7000"
  }
];

let current = 0;
const titleEl = document.getElementById("question-title");
const textEl = document.getElementById("question-text");
const inputEl = document.getElementById("answer-input");
const feedbackEl = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-btn");

function cleanInput(str) {
  return str.trim().toLowerCase().replace(/\s+/g, "");
}

function loadQuestion() {
  const q = questions[current];
  titleEl.textContent = q.title;
  textEl.innerHTML = q.text;
  inputEl.value = "";
  feedbackEl.textContent = "";
}

function checkAnswer() {
  const userAns = cleanInput(inputEl.value);
  const correctAns = cleanInput(questions[current].answer);

  if (userAns === correctAns) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "#00ffae";
    current++;

    if (current < questions.length) {
      setTimeout(loadQuestion, 800);
    } else {
      setTimeout(showFinalMessage, 700);
    }
  } else {
    feedbackEl.textContent = "❌ Try again!";
    feedbackEl.style.color = "#ff6b6b";
  }
}

function showFinalMessage() {
  document.getElementById("quiz-box").innerHTML = `
    <h2>🎉 Round 2 Completed!</h2>
    <p>All questions answered correctly.</p>
    <button onclick="restartQuiz()">Restart</button>
  `;
}

function restartQuiz() {
  current = 0;
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
inputEl.addEventListener("keypress", (e) => { if (e.key === "Enter") checkAnswer(); });
loadQuestion();
