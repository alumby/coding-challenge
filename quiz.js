const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
var barWidth = 0;
//questions array
const myQuestions = [{
        question: "In which year did you escape?",
        answers: {
            a: "1997",
            b: "2013"
        },
        nyAnswer: "a"
    },
    {
        question: "What caused the root of all of the chaos?",
        answers: {
            a: "An Earthquake",
            b: "World War III"
        },
        nyAnswer: "b"
    },
    {
        question: "The president tries to stop an invasion from where?",
        answers: {
            a: "Cuba",
            b: "Soviet Union"
        },
        nyAnswer: "b"
    },
    {
        question: "Where was an island converted into a prison?",
        answers: {
            a: "LA",
            b: "Manhattan"
        },
        nyAnswer: "b"
    },
    {
        question: "Warning.. SPOILER ALERT: At the end of the movie, the main character Snake, does what?",
        answers: {
            a: "Puffs a cigarette while going into the darkness",
            b: "Picks a cigarette box labelled 'American Spirit'"
        },
        nyAnswer: "a"
    }
];
function startQuiz() {
  document.getElementById('quizStart').style.display = "none"; 
  document.getElementById('buttonShow').style.display = "block";
}
var numberQuestions = myQuestions.length;
//build the quiz
function constructQuiz() {
    const output = [];
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<input id=" ${currentQuestion.answers[letter]}" type="radio" name="question${questionNumber}" value="${letter}"><label for=" ${currentQuestion.answers[letter]}" class="answer">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
                );
            }
            output.push(
                `<div class="slide">
    <div class="question"><p> ${currentQuestion.question} </p></div>
    <div class="answers"> ${answers.join("")} </div>
  </div>`
            );
        }
    );
     quizContainer.innerHTML = output.join('');
    forwardProgression();
}
function showResults() {
    // gather answers
    const answerContainers = quizContainer.querySelectorAll('.answers');
    // keep track of user's answers
    let numNY = 0;
    let numLA = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question' + questionNumber + ']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if (userAnswer === currentQuestion.nyAnswer) {
            numNY++;
        }
        else {
            numLA++;
        }
    });
    document.getElementById("buttonShow").style.display = "none";
    if (numNY > numLA) {
      document.getElementById("resultNY").style.display = "block";
    }
    else {
      document.getElementById("resultLA").style.display = "block";
    }
}
// display quiz although it is hidden with CSS on page load
constructQuiz();
// control which question slide is showing
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
//show the question slide
function showSlide(n) {
    slides[currentSlide].classList.remove('current-slide');
    slides[n].classList.add('current-slide');
    currentSlide = n;
    if (currentSlide === 0) {
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}
showSlide(0);
//navigation buttons
function nextSlide() {
    showSlide(currentSlide + 1);
    forwardProgression();
}
function previousSlide() {
    showSlide(currentSlide - 1);
    backProgression();
}
// progress bar
function forwardProgression() {
    barWidth += 100 / numberQuestions;
    if (barWidth > 100) {
        barWidth = 100;
    }
    // update progress bar with each answer
    document.getElementById("progressBar").style.width = barWidth + "%";
}
// calculate the progress
function backProgression() {
    barWidth -= 100 / myQuestions.length;
    if (barWidth < 0) {
        barWidth = 0;
    }
    // update the width of the progress bar
    document.getElementById("progressBar").style.width = barWidth + "%";
}
previousButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide);
// hide quiz and show results after user clicks submit
submitButton.addEventListener('click', showResults);
