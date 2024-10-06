const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "A. Berlin", correct: false },
            { text: "B. Madrid", correct: false },
            { text: "C. Paris", correct: true },
            { text: "D. Rome", correct: false }
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "A. 3", correct: false },
            { text: "B. 4", correct: true },
            { text: "C. 5", correct: false },
            { text: "D. 6", correct: false }
        ]
    },
    {
        question: "What is the Capital of Uttar Pradesh?",
        answers: [
            { text: "A. Chandigarh", correct: false },
            { text: "B. Lucknow", correct: true },
            { text: "C. Jaipur", correct: false },
            { text: "D. Dispur", correct: false }
        ]
    },
    {
        question: "Which ocean is the largest?",
        answers: [
            { text: "A. Atlantic", correct: false },
            { text: "B. Indian", correct: false },
            { text: "C. Pacific", correct: true },
            { text: "D. Arctic", correct: false }
        ]
    },
    {
        question: "Who wrote 'Discovery Of India'?",
        answers: [
            { text: "A. Mahatma Gandhi", correct: false },
            { text: "B. Rajiv Gandhi", correct: false },
            { text: "C. Pandit Jawaharlal Nehru", correct: true },
            { text: "VV Giri", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const timerElement = document.getElementById('timer');
const questionNumberElement = document.getElementById('question-number');

let currentQuestionIndex;
let score = 0; 
let timer;

function startQuiz() {
    
    if (!localStorage.getItem('currentQuestionIndex')) {
        currentQuestionIndex = 0; 
        score = 0; 
    } else {
        currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')); 
        score = parseInt(localStorage.getItem('score')) || 0; 
    }

    if (currentQuestionIndex >= questions.length) {
        showScore();
    } else {
        showQuestion(questions[currentQuestionIndex]);
        startTimer();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = '';
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`; // 
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    clearTimeout(timer);
    if (answer.correct) {
        score++;
    }
    localStorage.setItem('score', score);
    currentQuestionIndex++;
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        startTimer();
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreElement.innerText = score !== 0 ? score : 0;
    
    timerElement.classList.add('hidden'); 
    questionNumberElement.classList.add('hidden'); 
}

function startTimer() {
    let timeLeft = 10; 
    timerElement.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
            if (currentQuestionIndex < questions.length) {
                showQuestion(questions[currentQuestionIndex]);
                startTimer();
            } else {
                showScore();
            }
        }
    }, 1000); 
}

restartButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

startQuiz();
