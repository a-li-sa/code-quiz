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
const seeHighscoreBtn = document.getElementById('see-highscore-btn');
const saveHighscoreBtn = document.getElementById('save-highscore-btn');
const takeAgain = document.getElementById('take-again');
const takeAgainBtn = document.getElementById('take-again-btn');
const questionNumber = document.getElementById('question-number');
const clearBtn = document.getElementById('clear-btn');

let highscores = [];
let userInitials = document.getElementById('user-initials');
let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which of the following is not an option for specifying a color in CSS3?",
    choice1: "hexadecimal",
    choice2: "binary",
    choice3: "rgba",
    choice4: "color name",
    answer: 2
  },
  {
    question: "The default display value for <a> element is:",
    choice1: "inline",
    choice2: "inline-block",
    choice3: "block",
    choice4: "none",
    answer: 1
  },
  {
    question: "What is the correct HTML for referring to an external style sheet?",
    choice1: '<link rel="css" href="mystyle.css">',
    choice2: '<link rel="stylesheet" href="mystyle.css">',
    choice3: '<link rel="stylesheet" src="mystyle.css">',
    choice4: '<style src="mystyle.css"></style>',
    answer: 2
  },
  {
    question: "What does <thead> stand for?",
    choice1: "The head",
    choice2: "Table head",
    choice3: "Table header",
    choice4: "None of the above",
    answer: 3
  },
  {
    question: "When a function returns a node from the DOM, it is of type",
    choice1: "Number",
    choice2: "Object",
    choice3: "String",
    choice4: "Boolean",
    answer: 2
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
  if (availableQuestions.length === 0) {
    return;
  }
}

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

getNewQuestion = () => {
  if (availableQuestions.length === 0) {
    showResults();
  } else {
    questionCounter++;
    questionNumber.innerHTML = "Question " + questionCounter + " out of 5";
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach( choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
    })
    availableQuestions.splice(questionIndex, 1);
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
      getNewQuestion();
    }, 500);
  })
})

function showResults(){
  questionContainer.setAttribute('hidden', true);
  timer.setAttribute('hidden', true);
  showScore.innerHTML = score + '/5';
  resultsContainer.removeAttribute('hidden');
}

function renderHighscores() {
  if (localStorage.getItem("highscores")) {
    const savedHighscores = JSON.parse(localStorage.getItem("highscores"));
    highscores.push(...savedHighscores);
    for (var i = 0; i < highscores.length; i++) {
      const p = document.createElement("p");
      p.textContent = highscores[i];
      highscoreList.appendChild(p);
    }
  }
}

renderHighscores();

function storeHighscore(array) {
  localStorage.setItem("highscores", JSON.stringify(array));
}

function clearScores() {
  highscores.length = 0;
  storeHighscore(highscores);
  renderHighscores();
  highscoreList.textContent = "";
}

clearBtn.addEventListener('click', function () {
  clearScores();
})

function sortHighscores() {
  highscores
}

saveHighscoreBtn.addEventListener('click', function(event) {
  highscores.push(score + ' - ' + userInitials.value);
  const p = document.createElement("p");
  p.textContent = score + ' - ' + userInitials.value;
  highscoreList.appendChild(p);
  userInitials.value = "";
  storeHighscore(highscores);
  seeHighscoreBtn.click();
  form.setAttribute('hidden', true);
});

startBtn.addEventListener('click', function() {
  startContainer.setAttribute('hidden', true);
  questionContainer.removeAttribute('hidden');
  timer.removeAttribute('hidden');
  countdown.textContent = 20;
  setTimer();
  startGame();
});

takeAgainBtn.addEventListener('click', function() {
  secondsLeft = 20;
  if (form.hasAttribute('hidden')) {
    form.removeAttribute('hidden');
  }
  resultsContainer.setAttribute('hidden', true);
  startContainer.removeAttribute('hidden');
})