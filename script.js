// ===== Dados do Quiz - Matemática 6º Ano =====
const questions = [
    {
        question: "Qual é o resultado de 48 ÷ 6?",
        options: ["6", "7", "8", "9"],
        correct: 2
    },
    {
        question: "Qual fração representa a metade de um todo?",
        options: ["1/3", "1/4", "1/2", "2/3"],
        correct: 2
    },
    {
        question: "Qual número é múltiplo de 5?",
        options: ["12", "18", "25", "33"],
        correct: 2
    },
    {
        question: "Quanto é 3/4 + 1/4?",
        options: ["1", "1/2", "2/4", "4/8"],
        correct: 0
    },
    {
        question: "Qual é o dobro de 15?",
        options: ["20", "25", "30", "35"],
        correct: 2
    },
    {
        question: "Qual número é primo?",
        options: ["9", "15", "17", "21"],
        correct: 2
    },
    {
        question: "Quanto é 7 × 8?",
        options: ["54", "56", "63", "72"],
        correct: 1
    },
    {
        question: "Qual é a raiz quadrada de 36?",
        options: ["4", "5", "6", "9"],
        correct: 2
    },
    {
        question: "Se um retângulo tem lados 5 cm e 8 cm, qual é o perímetro?",
        options: ["13 cm", "26 cm", "40 cm", "20 cm"],
        correct: 1
    },
    {
        question: "Qual fração é equivalente a 2/4?",
        options: ["1/3", "1/2", "3/5", "2/6"],
        correct: 1
    }
];

// ===== Estado do Jogo =====
let currentQuestion = 0;
let score = 0;
let lives = 3;
let playerName = "";
let answered = false;

// ===== Elementos do DOM =====
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const playerNameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const displayName = document.getElementById("display-name");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const questionNumberEl = document.getElementById("question-number");
const progressEl = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");

const endTitle = document.getElementById("end-title");
const endEmoji = document.getElementById("end-emoji");
const endMessage = document.getElementById("end-message");
const finalScoreEl = document.getElementById("final-score");
const endDetails = document.getElementById("end-details");

// ===== Funções =====
function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

function updateStats() {
    scoreEl.textContent = score;
    livesEl.textContent = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
    questionNumberEl.textContent = `${currentQuestion + 1}/${questions.length}`;
    progressEl.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function loadQuestion() {
    answered = false;
    feedbackEl.classList.add("hidden");
    feedbackEl.classList.remove("correct", "wrong");

    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span>${opt}</span>
        `;
        btn.addEventListener("click", () => selectAnswer(index));
        optionsContainer.appendChild(btn);
    });

    updateStats();
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
            btn.classList.add("correct");
        } else if (i === index && index !== q.correct) {
            btn.classList.add("wrong");
        }
    });

    if (index === q.correct) {
        score += 10;
        feedbackEl.textContent = "✅ Muito bem! Resposta correta!";
        feedbackEl.classList.remove("hidden", "wrong");
        feedbackEl.classList.add("correct");
    } else {
        lives--;
        feedbackEl.textContent = `❌ Ops! A resposta certa era: ${q.options[q.correct]}`;
        feedbackEl.classList.remove("hidden", "correct");
        feedbackEl.classList.add("wrong");
    }

    updateStats();

    setTimeout(() => {
        if (lives <= 0 || currentQuestion >= questions.length - 1) {
            endGame();
        } else {
            currentQuestion++;
            loadQuestion();
        }
    }, 1800);
}

function endGame() {
    showScreen(endScreen);
    finalScoreEl.textContent = score;

    const maxScore = questions.length * 10;
    const percentage = (score / maxScore) * 100;

    if (lives <= 0) {
        endTitle.textContent = "Game Over!";
        endEmoji.textContent = "😢";
        endMessage.textContent = `Que pena, ${playerName}! Suas vidas acabaram.`;
        endDetails.textContent = `Você fez ${score} pontos. Continue praticando e tente novamente!`;
    } else if (percentage >= 80) {
        endTitle.textContent = "Incrível!";
        endEmoji.textContent = "🏆";
        endMessage.textContent = `Parabéns, ${playerName}! Você é um super matemático!`;
        endDetails.textContent = `Você acertou a maioria das perguntas. Pontuação máxima possível: ${maxScore}.`;
    } else if (percentage >= 50) {
        endTitle.textContent = "Muito bem!";
        endEmoji.textContent = "🌟";
        endMessage.textContent = `Bom trabalho, ${playerName}!`;
        endDetails.textContent = `Você está no caminho certo. Continue estudando para melhorar ainda mais!`;
    } else {
        endTitle.textContent = "Continue tentando!";
        endEmoji.textContent = "💪";
        endMessage.textContent = `Não desanime, ${playerName}!`;
        endDetails.textContent = `A prática leva à perfeição. Que tal jogar de novo?`;
    }
}

function startGame() {
    playerName = playerNameInput.value.trim() || "Aventureiro";
    displayName.textContent = playerName;
    currentQuestion = 0;
    score = 0;
    lives = 3;
    showScreen(gameScreen);
    loadQuestion();
}

function restartGame() {
    playerNameInput.value = "";
    showScreen(startScreen);
}

// ===== Eventos =====
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

playerNameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") startGame();
});
