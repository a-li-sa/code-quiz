const startBtn = document.getElementById('start-btn');
const startContainer = document.getElementById('start-container');
const questionContainer = document.getElementById('question-container');
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const timer = document.getElementById('timer');
const countdown = document.getElementById('countdown');
const resultsContainer = document.getElementById('results-container');
const showScore = document.getElementById('show-score');
const form = document.getElementById('form');
const saveHighscoreBtn = document.getElementById('save-highscore-btn');
const takeAgain = document.getElementById('take-again');
const takeAgainBtn = document.getElementById('take-again-btn');

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "click a",
    choice1: "a",
    choice2: "b",
    choice3: "c",
    choice4: "d",
    answer: 1
  },
  {
    question: "click b",
    choice1: "a",
    choice2: "b",
    choice3: "c",
    choice4: "d",
    answer: 2
  },
  {
    question: "click c",
    choice1: "a",
    choice2: "b",
    choice3: "c",
    choice4: "d",
    answer: 3
  },
  {
    question: "click d",
    choice1: "a",
    choice2: "b",
    choice3: "c",
    choice4: "d",
    answer: 4
  },
  {
    question: "click a",
    choice1: "a",
    choice2: "b",
    choice3: "c",
    choice4: "d",
    answer: 1
  }
]

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestions();
}

getNewQuestions = () => {
  if (availableQuestions.length === 0) {
    showResults();
  } else {  
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach( choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
    })
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  }
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    if (selectedAnswer == currentQuestion.answer) {
      score++;
      secondsLeft += 5;
    } else {
      secondsLeft -= 5;
    }
    getNewQuestions();
  })
})

startBtn.addEventListener('click', function() {
  startContainer.setAttribute('hidden', true);
  questionContainer.removeAttribute('hidden');
  timer.removeAttribute('hidden');
  countdown.textContent = 20;
  setTimer();
  startGame();
});

let secondsLeft = 20;

function setTimer() {
  let timerInterval = setInterval(function() {
    secondsLeft--;
    countdown.textContent = secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      showResults()
    }
  }, 1000);
}


function showResults(){
  questionContainer.setAttribute('hidden', true);
  timer.setAttribute('hidden', true);
  showScore.innerHTML = score + '/5';
  resultsContainer.removeAttribute('hidden');
}

saveHighscoreBtn.addEventListener('click', function() {

});

takeAgainBtn.addEventListener('click', function() {
  resultsContainer.setAttribute('hidden', true);
  startContainer.removeAttribute('hidden');
  secondsLeft = 20;
})