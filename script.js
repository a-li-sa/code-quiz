const startBtn = document.getElementById('start-btn');
const startContainer = document.getElementById('start-container');
const questionContainer = document.getElementById('question-container');
const timer = document.getElementById('timer');
const countdown = document.getElementById('countdown');
const resultsContainer = document.getElementById('results-container');
const form = document.getElementById('form');
const saveHighscoreBtn = document.getElementById('save-highscore-btn');
const takeAgain = document.getElementById('take-again');
const takeAgainBtn = document.getElementById('take-again-btn');

startBtn.addEventListener('click', function() {
  startContainer.setAttribute('hidden', true);
  questionContainer.removeAttribute('hidden');
  timer.removeAttribute('hidden');
  countdown.textContent = 20;
  setTimer();
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
  resultsContainer.removeAttribute('hidden');
}

saveHighscoreBtn.addEventListener('click', function() {

});

takeAgainBtn.addEventListener('click', function() {
  resultsContainer.setAttribute('hidden', true);
  startContainer.removeAttribute('hidden');
  secondsLeft = 20;
})


//*consts*
  // questions
  // highscore []
  // results
  // start button
  // submit answer button
  // submit high score button
  // timer
//*functions*
  // display quiz
  // add new highscores to highscore list
  // clear high scores
  // sort high scores 
  // initialize quiz
  //clear answer indicator
  // start quiz
    //set timer
    // display quiz
  //next question
    //if current question is greater than length of questions array, end quiz
    // disable submit answer button
  // end quiz
    //clear timer interval
    //show results
    // display results function
  // display results
//*add event listener click events*
  //click start quiz button
  //click submit answer button 
    //if answer is correct, show correct
    //else show wrong and subtract time from timer
    //function to show next question
  //click submit initials to save highscore button
  //click highscore button
  //click clear highscores button



// const $startButtonEl = document.getElementById('start-btn');
// const $nextButtonEl = document.getElementById('next-btn');
// const $mcEl = document.getElementById('mc');
// const $questionEl = document.getElementById('question');
// const $mcBtnsEl = document.getElementById('mc-btns');
// const $btn = document.querySelectorAll('.btn');
// const $aEl = document.getElementById('a');
// const $bEl = document.getElementById('b');
// const $cEl = document.getElementById('c');
// const $dEl = document.getElementById('d');

// let shuffledQUestions, currentIndex;


// $startButtonEl.addEventListener('click', startGame)

// function startGame() {
//   $startButtonEl.classList.add('hide');
//   $mcEl.classList.remove('hide');
//   shuffledQuestions = questions.sort(() => Math.random() - 0.5);
//   currentIndex = 0;
//   showQuestion();
// }

// function resetQuestion() {
//   if ($btn[0].classList.contains('correct')) {
//     $btn[0].classList.remove('correct');
//   } else if ($btn[0].classList.contains('wrong')) {
//   $btn[0].classList.remove('wrong');
//   }
// }

// // function nextQuestion () {
// //   showQuestion(questions[currentIndex]);
// // }

// function showQuestion() {
//   $questionEl.innerText = questions[currentIndex][0];
//   $aEl.innerText = questions[currentIndex][1];
//   $bEl.innerText = questions[currentIndex][2];
//   $cEl.innerText = questions[currentIndex][3];
//   $dEl.innerText = questions[currentIndex][4];
// }

// $btn[0].addEventListener("click", function(event) {
//   const mcID = event.target.getAttribute('id');
//   if (mcID === questions[currentIndex][5]) {
//     event.target.classList.add('correct');
//   } else {
//     event.target.classList.add('wrong');
//   }
//   $nextButtonEl.classList.remove('hide');
// })

// $nextButtonEl.addEventListener("click", function(event) {
//   $nextButtonEl.classList.add('hide');
//   currentIndex++;
//   resetQuestion();
//   showQuestion();
// })


// const questions = [
//   ['what is the answer', 'not this', 'this', 'not this', 'not this', 'b'],
//   ['what is the second answer', 'this', 'not this', 'not this', 'not this', 'a'],
//   ['what is the third answer', 'not this', 'this', 'not this', 'not this', 'b'],
//   ['what is the fourth answer', 'this', 'not this', 'not this', 'not this', 'a']
// ]

