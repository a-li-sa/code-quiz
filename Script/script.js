//HTML elements
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
let userInitials = document.getElementById('user-initials');
// declare variables
let highscores = [];
let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let secondsLeft = 20;
//15 questions
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
  },
  {
    question: 'Which is the correct syntax to change the contents of this HTML element? <p id = "quiz">This is a quiz. </p>',
    choice1: 'document.getElementById("quiz").innerHTML ="New content!!";',
    choice2: '#quiz.innerHTML="New content!!";',
    choice3: 'document.getElementsByTagName("p").innerHTML ="New content!!";',
    choice4: 'quiz.innerHTML="New content!";',
    answer: 1
  },
  {
    question: "Which attribute is used to link to an external JavaScript file?",
    choice1: 'href; e.g., href = "extFile.js"',
    choice2: 'src; e.g., src = "extFile.js"',
    choice3: 'file; e.g., file = "extFile.js"',
    choice4: 'script; e.g., script = "extFile.js"',
    answer: 2
  },
  {
    question: 'How do you properly access the first element in an array variable named "fruit"?',
    choice1: "fruit[0]",
    choice2: "fruit[1]",
    choice3: "[fruit]0",
    choice4: "fruit_0",
    answer: 1
  },
  {
    question: "Which word is used to define a function in JavaScript?",
    choice1: "func",
    choice2: "function",
    choice3: "script",
    choice4: "define",
    answer: 2
  },
  {
    question: "The Domain Name Service looks up the domain and returns the",
    choice1: "IP address",
    choice2: "server",
    choice3: "host",
    choice4: "document",
    answer: 1
  },
  {
    question: "Which is the correct file extension for a web page?",
    choice1: ".ppt",
    choice2: ".doc",
    choice3: ".html",
    choice4: ".txt",
    answer: 3
  },
  {
    question: 'When should an image have null (empty) alt text (alt - "")?',
    choice1: "When the image is black and white",
    choice2: "When the image is complex",
    choice3: "When the image is decorative",
    choice4: "When the image already displays descriptive text",
    answer: 3
  },
  {
    question: "Which of the following is the best way to convey that your text has special meaning?",
    choice1: "Using a larger font size to signify the important text",
    choice2: "Using colors to signify the important text",
    choice3: "Using a combination of font size and color to signify the important text",
    choice4: "Using semantic tags in addition to color and/or font.",
    answer: 4
  },
  {
    question: "Which version of HTML introduced semantic tags?",
    choice1: "HTML 4.0.1",
    choice2: "HTML 5",
    choice3: "HTML 2.0",
    choice4: "HTML 3.2",
    answer: 2
  },
  {
    question: "Every well-formed HTML document should include:",
    choice1: "doctype, head, body",
    choice2: "doctype, header, body",
    choice3: "header, nav, footer",
    choice4: "alt text",
    answer: 1
  }
]
//timer terminates when the timer hits 0 or when user finishes all of the questions
function setTimer() {
  let timerInterval = setInterval(function() {
    secondsLeft--;
    countdown.textContent = secondsLeft;
    if (secondsLeft <= 0 || questionCounter > 15) {
      clearInterval(timerInterval);
      showResults()
    }
  }, 1000);
}
//when the game starts, the questionCounter and score reset, and the questions are reloaded
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}
//when the start button is clicked, hide the start containeer and start the timer
startBtn.addEventListener('click', function() {
  startContainer.setAttribute('hidden', true);
  questionContainer.removeAttribute('hidden');
  timer.removeAttribute('hidden');
  countdown.textContent = 20;
  setTimer();
  startGame();
});
//renders a question and stops the quiz when there are no more questions
function getNewQuestion() {
  if (availableQuestions.length === 0) {
    questionCounter++
    //the user wil be directed to the results page when questions run out
    showResults();
  } else {
    //a random question from the available questions array will be displayed, and questions will not repeat
    questionCounter++;
    questionNumber.innerHTML = "Question " + questionCounter + " out of " + questions.length;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach( choice => {
      choice.innerText = currentQuestion['choice' + choice.dataset['number']];
    })
    availableQuestions.splice(questionIndex, 1);
  }
}
//disable the buttons for when the quiz shows the correct/wrong answer
function disableBtns() {
  for (i = 0; i < choices.length; i++) {
    choices[i].disabled = true;
  }
}
//changes the buttons back the to default colors
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
//when a choice gets clicked
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    if (selectedAnswer == currentQuestion.answer) {
      selectedChoice.setAttribute("class", "btn btn-block choice-text btn-success");
      score++;
      // 5 + 1 to offset the timeout
      secondsLeft += 6;
    } else {
      selectedChoice.setAttribute("class", "btn btn-block choice-text btn-danger");
      // 5 - 1 to offset the timeout
      secondsLeft -= 4;
    }
    disableBtns();
    setTimeout( () => {
      resetBtns()
      getNewQuestion();
    }, 1000);
  })
})
//this gets called when the quiz is over, it hides the questionContainer, unhides the resultsContainer and shows the final score
function showResults(){
  questionContainer.setAttribute('hidden', true);
  timer.setAttribute('hidden', true);
  showScore.innerHTML = score + '/' + questions.length;
  resultsContainer.removeAttribute('hidden');
}
//loads the savedHighscores from the localStorage and appends it to the modal
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
//call the function when the page is loaded
renderHighscores();
// this will be called whenever the user changes the localstorage
function storeHighscore(array) {
  localStorage.setItem("highscores", JSON.stringify(array));
}
//when the clear button is clicked, the highscores array resets
clearBtn.addEventListener('click', function () {
  highscores.length = 0;
  storeHighscore(highscores);
  renderHighscores();
  highscoreList.textContent = "";
})
//when the save highscore btn is clicked, this adds a new item to the highscores array and appends the new item to the model 
saveHighscoreBtn.addEventListener('click', function(event) {
  highscores.push(score + '/' + questions.length + ' - ' + userInitials.value);
  const p = document.createElement("p");
  p.textContent = score + '/' + questions.length + ' - ' + userInitials.value;
  highscoreList.appendChild(p);
  userInitials.value = "";
  storeHighscore(highscores);
  seeHighscoreBtn.click();
  form.setAttribute('hidden', true);
});
//redirects the user to the start container and unhides the save highscore form
takeAgainBtn.addEventListener('click', function() {
  resultsContainer.setAttribute('hidden', true);
  secondsLeft = 20;
  if (form.hasAttribute('hidden')) {
    form.removeAttribute('hidden');
  }
  startContainer.removeAttribute('hidden');
})
//leave this code in to attempt to fix the bug where the results container unhides when it's not supposed to
if (!startContainer.hasAttribute('hidden', true)) {
  questionContainer.setAttribute('hidden', true);
  resultsContainer.setAttribute('hidden', true);
} else if (!questionContainer.hasAttribute('hidden', false)) {
  startContainer.setAttribute('hidden', true);
  resultsContainer.setAttribute('hidden', true);
} else {
  startContainer.setAttribute('hidden', true);
  resultsContainer.setAttribute('hidden', true);
}