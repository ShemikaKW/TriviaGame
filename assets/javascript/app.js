// CLICK EVENTS

$(document).on("click", "#start", function () {
    game.start();
});


$(document).on("click", "#done", function () {
    game.done();
});

var panel = $("#quiz-area");

// Questions and Answers

var questions = [{
    question: "What’s the name of Batman’s loyal butler?",
    choices: ["Norman Osborn", "James Stevens", "Alfred Pennyworth", "Otis"],
    correctAnswer: "Alfred Pennyworth"
}, {

    question: "Who plays the role of Rachel Dawes in the Dark Knight?",
    choices: ["Katie Holmes", "Liv Tyler", "Maggie Gyllenhaal", "Jennifer Connelly"],
    correctAnswer: "Maggie Gyllenhaal"
}, {

    question: "Who played the role of Batgirl in Batman and Robin?",
    choices: ["Drew Barrymore", "Kirsten Dunst", "Alicia Silverstone", "Liv Tyler"],
    correctAnswer: "Alicia Silverstone"
}, {

    question: "Who directed Batman Begins and The Dark Knight?",
    choices: ["Tim Burton", "Terry Gilliam", "Christopher Nolan", "David Lynch"],
    correctAnswer: "Christopher Nolan"
}, {

    question: '"The Bat, the Cat, the Penquin" is the tagline from which Batman movie?',
    choices: ["Batman and Robin", "Batman Forever", "Batman Returns", "Batman"],
    correctAnswer: "Batman Returns"
}, {

    question: "What’s the name of the city where Batman lives?",
    choices: ["Gotham City", "Metropolis", "Empire City", "Coruscant"],
    correctAnswer: "Gotham City"
}];

console.log(questions);

//Variable for the timer

var timer;

var game = {

    correct: 0,
    incorrect: 0,
    counter: 45,

    countdown: function () {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("TIME UP");
            game.done();
        }
    },

    start: function () {
        timer = setInterval(game.countdown, 1000);

        $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>");

        $("#start").remove();

        for (var i = 0; i < questions.length; i++) {
            panel.append("<h2>" + questions[i].question + "</h2>");
            for (var j = 0; j < questions[i].answers.length; j++) {
                panel.append("<input type='radio' name='question-" + i +
                    "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
            }
        }

        panel.append("<button id='done'>Done</button>");
    },

    done: function () {

        $.each($("input[name='question-0']:checked"), function () {
            if ($(this).val() === questions[0].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-1']:checked"), function () {
            if ($(this).val() === questions[1].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-2']:checked"), function () {
            if ($(this).val() === questions[2].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-3']:checked"), function () {
            if ($(this).val() === questions[3].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-4']:checked"), function () {
            if ($(this).val() === questions[4].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-5']:checked"), function () {
            if ($(this).val() === questions[5].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-6']:checked"), function () {
            if ($(this).val() === questions[6].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });


        this.result();

    },

    result: function () {

        clearInterval(timer);

        $("#sub-wrapper h2").remove();

        panel.html("<h2>All Done!</h2>");
        panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    }
};



