const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
let questions = [];
let current = 0;
let score = 0;
let timer;

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuBtn.textContent = mobileMenu.classList.contains("hidden") ? "☰" : "✕";
});

async function loadQuestions() {
  const params = new URLSearchParams(window.location.search);
  const level = params.get("level");
  if (!level) return;

  const res = await fetch(`/api/questions?level=${level}`);
  questions = await res.json();
  current = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById("questionText").innerText = q.question;

  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className =
      "optionBtn w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-medium transition";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    optionsBox.appendChild(btn);
  });

  startTimer(15);
}

function checkAnswer(selectedIndex) {
  clearTimeout(timer);

  const q = questions[current];
  const correctIndex = q.answer;

  const optionButtons = document.querySelectorAll(".optionBtn");

  optionButtons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.add("cursor-not-allowed");
  });

  optionButtons[correctIndex].classList.remove("bg-slate-800");
  optionButtons[correctIndex].classList.add("bg-green-600", "text-white");

  if (selectedIndex !== correctIndex) {
    optionButtons[selectedIndex].classList.remove("bg-slate-800");
    optionButtons[selectedIndex].classList.add("bg-red-600", "text-white");
  } else {
    score++;
  }

  setTimeout(() => {
    current++;

    if (current < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1200);
}

function startTimer(seconds = 15) {
  clearTimeout(timer);

  const bar = document.getElementById("timerBar");
  bar.style.transition = "none";
  bar.style.width = "100%";

  setTimeout(() => {
    bar.style.transition = `width ${seconds}s linear`;
    bar.style.width = "0%";
  }, 100);

  timer = setTimeout(() => {
    checkAnswer(-1);
  }, seconds * 1000);
}

loadQuestions();

async function endQuiz() {
  clearTimeout(timer);

  const params = new URLSearchParams(window.location.search);
  const level = params.get("level");

  await fetch("/results/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ level, score }),
  });

  document.getElementById("questionText").innerHTML = `
    🎉 <b>Quiz Completed!</b> <br>
    <span class="text-cyan-400 font-bold text-3xl">
      Score: ${score}/${questions.length}
    </span>
  `;

  document.getElementById("options").innerHTML = `
    <div class="space-y-4">

      <a href="/play" 
         class="block px-6 py-3 bg-purple-500 text-black font-semibold rounded-lg shadow-md hover:bg-purple-400 transition">
         🔄 Restart Quiz
      </a>

      <a href="/results"
         class="block px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg shadow-md hover:bg-cyan-400 transition">
         🏆 View Leaderboard
      </a>

    </div>
  `;
}
