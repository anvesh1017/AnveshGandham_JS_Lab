function Question(questionText, questionNo) {
  this.questionText = questionText;
  this.questionNo = questionNo;
}

function Answer(answerText) {
  this.answerText = answerText;
}

function QuestionAnswerOptions(
  questionObj,
  answerOptionsObj,
  correctAnswerObj
) {
  this.questionObj = questionObj;
  this.answerOptionsObj = answerOptionsObj;
  this.correctAnswerObj = correctAnswerObj;

  this.correctAnswer = function (userSuppliedAnswer) {
    if (this.correctAnswerObj.answerText == userSuppliedAnswer) {
      console.log("Correct Answer");
      return true;
    } else {
      console.log("Incorrect Answer");
      return false;
    }
  };
}

// Question-Answer [1]

const question1 = new Question("Javascript supports", 1);

const answer1Q1 = new Answer("Functions");
const answer2Q1 = new Answer("XHTML");
const answer3Q1 = new Answer("CSS");
const answer4Q1 = new Answer("HTML");

const qA1 = new QuestionAnswerOptions(
  question1,
  [answer1Q1, answer2Q1, answer3Q1, answer4Q1],
  answer1Q1
);

// Question-Answer [2]

const question2 = new Question(
  "Which language can be used for styling web pages ?",
  2
);

const answer1Q2 = new Answer("HTML");
const answer2Q2 = new Answer("JQuery");
const answer3Q2 = new Answer("CSS");
const answer4Q2 = new Answer("XML");

const qA2 = new QuestionAnswerOptions(
  question2,
  [answer1Q2, answer2Q2, answer3Q2, answer4Q2],
  answer3Q2
);

// Question-Answer [3]

const question3 = new Question("Which is not a Javascript Framework", 3);

const answer1Q3 = new Answer("Python Script");
const answer2Q3 = new Answer("JQuery");
const answer3Q3 = new Answer("Django");
const answer4Q3 = new Answer("Node JS");

const qA3 = new QuestionAnswerOptions(
  question3,
  [answer1Q3, answer2Q3, answer3Q3, answer4Q3],
  answer1Q3
);

// Question-Answer [4]

const question4 = new Question("Which is used to connect to Database?", 4);

const answer1Q4 = new Answer("PHP");
const answer2Q4 = new Answer("HTML");
const answer3Q4 = new Answer("JS");
const answer4Q4 = new Answer("All");

const qA4 = new QuestionAnswerOptions(
  question4,
  [answer1Q4, answer2Q4, answer3Q4, answer4Q4],
  answer1Q4
);

// Question-Answer [5]

const question5 = new Question("Javascript is a ?", 5);

const answer1Q5 = new Answer("Language");
const answer2Q5 = new Answer("Programming Language");
const answer3Q5 = new Answer("Development");
const answer4Q5 = new Answer("All");

const qA5 = new QuestionAnswerOptions(
  question5,
  [answer1Q5, answer2Q5, answer3Q5, answer4Q5],
  answer2Q5
);

function QuizApp(QuestionAnswerOptionsObj) {
  this.QuestionAnswerOptionsObj = QuestionAnswerOptionsObj;

  this.pageIndex = 0;
  this.score = 0;

  this.getScore = function () {
    return this.score;
  };

  this.incrementScore = function () {
    this.score++;
  };

  this.incrementPageIndex = function () {
    this.pageIndex++;
  };

  this.calculatePercentage = function () {
    const percent =
      (this.getScore() / this.QuestionAnswerOptionsObj.length) * 100;
    return percent;
  };

  this.init = function () {
    this.addListenersForAnswerButtons();
    this.getContentArea();
  };

  this.addListenersForAnswerButtons = function () {

    //quiz app
    const currentQuizObj = this;

    for (let index = 0; index < 4; index++) {
      // btn0, btn1, btn2, btn3

      let buttonID = "btn" + index;
      const answerButtonElement = document.getElementById(buttonID);

      answerButtonElement.onclick = function (event) {

            console.log("Button is Clicked....");

            const userAnswer = event.target.innerText;

            console.log("user supplied answer is ", userAnswer);

            const currentQAObj = currentQuizObj.QuestionAnswerOptionsObj[currentQuizObj.pageIndex];

            const checkQA = currentQAObj.correctAnswer(userAnswer);

            console.log("Check answer is ", checkQA);

            if (checkQA) {
                currentQuizObj.incrementScore();
            }

            console.log("Current Score", currentQuizObj.getScore());

            if (currentQuizObj.pageIndex === (currentQuizObj.QuestionAnswerOptionsObj.length - 1)) {
                currentQuizObj.drawResultPage();
            } else {
                currentQuizObj.incrementPageIndex();
                currentQuizObj.init();
            }



      };
    }
  };

  this.drawResultPage = function() {
    const resultHTMLContent = `<h1>Result</h1>
    <p id="question">Your Score is ${this.getScore()}. Your Percentage is ${this.calculatePercentage()}</p>`;

    const quizDiv = document.getElementById('quiz');

    quizDiv.innerHTML = resultHTMLContent;
  }

  this.getContentArea = function() {

    // question object
    const questionElement = document.getElementById('question');
    const currentQAObj = this.QuestionAnswerOptionsObj[this.pageIndex];

    questionElement.innerHTML = currentQAObj.questionObj.questionText;

   // answer object
    const answerChoicesObj = currentQAObj.answerOptionsObj;

    for (let i = 0; i < 4; i += 1) {
        const answerChoice = answerChoicesObj[i];

        const spanId = "choice" + i;

        const spanElement = document.getElementById(spanId);

        spanElement.innerHTML = answerChoice.answerText;
    }

    // footer object

    const footerElement = document.getElementById("progress");

    const questionNumber = currentQAObj.questionObj.questionNo;
    const totalQuestions = this.QuestionAnswerOptionsObj.length;

    footerElement.innerHTML = `Question ${questionNumber} of ${totalQuestions}`;

  }
}

const quizApp = new QuizApp([qA1, qA2, qA3, qA4, qA5]);

quizApp.init();