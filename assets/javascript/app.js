var panel = $("#question-area");
var countStartNumber = 30;

// Questions and Answers

var questions = [{
    question: "What’s the name of Batman’s loyal butler?",
    choices: ["Norman Osborn", "James Stevens", "Alfred Pennyworth", "Otis"],
    correctAnswer: "Alfred Pennyworth",
    image: "assets/images/Alfred_Pennyworth.jpg"
},
{

    question: "Who plays the role of Rachel Dawes in the Dark Knight?",
    choices: ["Katie Holmes", "Liv Tyler", "Maggie Gyllenhaal", "Jennifer Connelly"],
    correctAnswer: "Maggie Gyllenhaal",
    image: "assets/images/Maggie_G.jpg"
}, 
{

    question: "Who played the role of Batgirl in Batman and Robin?",
    choices: ["Drew Barrymore", "Kirsten Dunst", "Alicia Silverstone", "Liv Tyler"],
    correctAnswer: "Alicia Silverstone",
    image: "assets/images/Alicia_Silverstone.jpg"
},
{

    question: "Who directed Batman Begins and The Dark Knight?",
    choices: ["Tim Burton", "Terry Gilliam", "Christopher Nolan", "David Lynch"],
    correctAnswer: "Christopher Nolan",
    image:"assets/images/Christopher_Nolan.jpg"
},
{

    question: '"The Bat, the Cat, the Penquin" is the tagline from which Batman movie?',
    choices: ["Batman and Robin", "Batman Forever", "Batman Returns", "Batman"],
    correctAnswer: "Batman Returns",
    image: "assets/images/Batman_returns.jpg"
},
{

    question: "What’s the name of the city where Batman lives?",
    choices: ["Gotham City", "Metropolis", "Empire City", "Coruscant"],
    correctAnswer: "Gotham City",
    image: "assets/images/Gotham.jpg"
}];

// Test
console.log(questions);

// Timer Variable
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].choices.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].choices[i]
      + "'>" + questions[this.currentQuestion].choices[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").html(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});