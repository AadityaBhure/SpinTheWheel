const questions = [
  {
    q: `1] (Technical)\nWhat does this print?\n
a = [1,2,3]\n
b = a[:]\n
b.append(4)\n
print(a, b)`,
    ans: "[1, 2, 3] [1, 2, 3, 4]"
  },
  {
    q: `2] (Technical)\nWhat is the output of:\n
for i in range(1,6):\n  if i%2==0: continue\n  print(i, end="")`,
    ans: "135"
  },
  {
    q: `3] (C)\nWhat does this print?\n
char str[] = "HELLO";\n
printf("%c", ++*str);`,
    ans: "I"
  },
  {
    q: `4] (Logical)\nFive people P, Q, R, S, T are standing in line.\nQ is not next to R; P is between S and Q.\nWho is at the center?`,
    ans: "P"
  },
  {
    q: `5] (Logical - Age)\nA is 2 years older than B, and B is twice as old as C.\nIf total age is 27, find A, B, C. Eg. [A B C]`,
    ans: "12 10 5"
  },
  {
    q: `6] (Logical - Pattern)\nIf 2 + 3 = 10, 8 + 4 = 96, 6 + 5 = 66, then 7 + 3 = ?`,
    ans: "70"
  },
  {
    q: `7] (Aptitude - Work)\nA, B, and C can complete work in 20, 30, and 60 days.\nA leaves after 2 days, B leaves 3 days before completion.\nFind total days to finish.`,
    ans: "20"
  },
  {
    q: `8] (Aptitude - Time & Work)\nA can complete a task in 10 days, and B can complete the same task in 20 days.\nThey work together for 5 days, and then A leaves.\nIn how many more days will B finish the remaining work?`,
    ans: "5"
  },
  {
    q: `9] (Aptitude - Compound Interest)\nA sum amounts to ₹9261 in 3 years at 10% compound interest.\nFind the principal.`,
    ans: "7000"
  }
];

let index = 0;
const total = questions.length;
let timeLeft =  10 * 60; // 10 min in seconds
let timerInterval;

const questionEl = document.getElementById("question");
const inputEl = document.getElementById("answerInput");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");
const submitBtn = document.getElementById("submitBtn");
const timerEl = document.getElementById("timer");

// Resume from localStorage if available
if (localStorage.getItem("quizIndex") !== null && localStorage.getItem("timeLeft") !== null) {
  const resume = confirm("You have a previous quiz attempt. Do you want to resume?");
  if (resume) {
    index = parseInt(localStorage.getItem("quizIndex"), 10);
    timeLeft = parseInt(localStorage.getItem("timeLeft"), 10);
  } else {
    localStorage.removeItem("quizIndex");
    localStorage.removeItem("timeLeft");
  }
}

function loadQuestion() {
  const qObj = questions[index];
  questionEl.textContent = qObj.q;
  progressEl.textContent = `Question ${index + 1} of ${total}`;
  feedbackEl.textContent = "";
  inputEl.value = "";
  inputEl.focus();
  saveState();
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuizTimeUp();
    } else {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerEl.textContent = `⏳ Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      timeLeft--;
      saveState();
    }
  }, 1000);
}

function saveState() {
  localStorage.setItem("quizIndex", index);
  localStorage.setItem("timeLeft", timeLeft);
}

function endQuizTimeUp() {
  feedbackEl.style.color = "#ff4d4d";
  feedbackEl.textContent = "⏳ Time’s up! Quiz stopped.";
  inputEl.disabled = true;
  submitBtn.disabled = true;
  timerEl.textContent = "⏰ 0:00";
  localStorage.clear();
}

submitBtn.addEventListener("click", () => {
  if (timeLeft <= 0) return;
  const userAns = inputEl.value.trim().toLowerCase();
  const correctAns = questions[index].ans.toLowerCase();

  if (userAns === correctAns) {
    feedbackEl.style.color = "#00ff9d";
    feedbackEl.textContent = "✅ Correct!";
    index++;

    if (index < total) {
      setTimeout(loadQuestion, 1000);
    } else {
      clearInterval(timerInterval);
      questionEl.textContent = "🎉 You have completed the quiz!";
      feedbackEl.textContent = "Well done!";
      inputEl.style.display = "none";
      submitBtn.style.display = "none";
      progressEl.textContent = "";
      timerEl.textContent = "";
      localStorage.clear();
    }
  } else {
    feedbackEl.style.color = "#ff4d4d";
    feedbackEl.textContent = "❌ Wrong, try again!";
  }
});

loadQuestion();
startTimer();

