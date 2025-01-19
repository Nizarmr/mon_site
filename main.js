let userInfo = null;

const registrationForm = document.getElementById('registration-form');
const userFormSection = document.getElementById('user-form');
const quizSection = document.getElementById('quiz');

const quizData = [
    {
        question: "What is the capital of France?",
        a: "London",
        b: "Berlin",
        c: "Paris",
        d: "Madrid",
        correct: "c"
    },
    {
        question: "What is 2 + 2?",
        a: "3",
        b: "4",
        c: "5",
        d: "6",
        correct: "b"
    },
    {
        question: "Which planet is known as the Red Planet?",
        a: "Mars",
        b: "Venus",
        c: "Jupiter",
        d: "Saturn",
        correct: "a"
    },
    {
        question: "What is the largest mammal in the world?",
        a: "African Elephant",
        b: "Blue Whale",
        c: "Giraffe",
        d: "Polar Bear",
        correct: "b"
    }
];

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    userInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };
    
    userFormSection.style.display = 'none';
    quizSection.style.display = 'block';
    
    loadQuiz();
});

const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitButton = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerElements.forEach(answer => answer.checked = false);
}

function getSelected() {
    let answer;
    answerElements.forEach(answerElement => {
        if(answerElement.checked) {
            answer = answerElement.id;
        }
    });
    return answer;
}

submitButton.addEventListener('click', () => {
    const answer = getSelected();
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>Hello ${userInfo.name}!</h2>
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});