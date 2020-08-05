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
const highscoreList = document.getElementById('highscore-list');
const saveHighscoreBtn = document.getElementById('save-highscore-btn');
const takeAgain = document.getElementById('take-again');
const takeAgainBtn = document.getElementById('take-again-btn');

let highscores = [];
let userInitials = document.getElementById('user-initials');
let currentQuestion = {};
let acceptingAnswers = true;
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

let secondsLeft = 20;

function setTimer() {
  let timerInterval = setInterval(function() {
    secondsLeft--;
    countdown.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      showResults()
    }
  }, 1000);
}

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

function disableBtns() {
  for (i = 0; i < choices.length; i++) {
    choices[i].disabled = true;
  }
}

function resetBtns() {
  for (i = 0; i < choices.length; i++) {
    if (!choices[i].classList.contains('btn-light')) {
      choices[i].classList.add('btn-light');
    } else if (choices[i].classList.contains('btn-danger')) {
      choices[i].classList.remove('btn-danger');
    } else if (choices[i].classList.contains('btn-success')) {
      choices[i].classList.remove('btn-success');
    }
    choices[i].disabled = false;
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
      selectedChoice.classList.remove("btn-light");
      selectedChoice.classList.add("btn-success");
      secondsLeft += 5;
    } else {
      selectedChoice.classList.remove("btn-light");
      selectedChoice.classList.add("btn-danger");
      secondsLeft -= 5;
    }
    disableBtns();
    setTimeout( () => {
      resetBtns()
      getNewQuestions();
    }, 500);
  })
})

function showResults(){
  questionContainer.setAttribute('hidden', true);
  timer.setAttribute('hidden', true);
  showScore.innerHTML = score + '/5';
  resultsContainer.removeAttribute('hidden');
}

startBtn.addEventListener('click', function() {
  startContainer.setAttribute('hidden', true);
  questionContainer.removeAttribute('hidden');
  timer.removeAttribute('hidden');
  countdown.textContent = 20;
  setTimer();
  startGame();
});

takeAgainBtn.addEventListener('click', function() {
  resultsContainer.setAttribute('hidden', true);
  startContainer.removeAttribute('hidden');
  secondsLeft = 20;
})