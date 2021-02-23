function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "/6</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("Qual dos seguintes e o starter pokemon de relva da primeira geracao?", ["Bellsprout", "Venusaur", "Caterpie", "Bulbasaur"], "Bulbasaur"),
    new Question("Drowzee e um pokemon da Primeira Geracao. De que tipo?", ["Psiquico", "Fogo", "Noturno", "Fantasma"], "Psiquico"),
    new Question("Qual o pokemon cuja evolucao e Gyarados", ["Squirtle", "Tentacruel", "Goldeen", "Magikarp"], "Magikarp"),
    new Question("Qual a evolucao do Minun?", ["Inexistente", "Minunim", "Minunptor", "Minur"], "Não tem evolução"),
    new Question("Quantas sao as geracoes de pokemons?", ["7", "8", "9", "10"], "8"),
    new Question("Qual e o pokemon com maior numero de evolucoes?", ["Charizard", "Pikachu", "Eevee", "O maximo que existe e 2 evoluções por cada pokemon"], "Eevee")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();