let timerInterval;

window.onload = function() {
    document.getElementById('quizForm').style.display = 'none';
};

async function fetchQuiz() {
    const numQuestions = document.getElementById('numQuestions').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;

    const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(url);
    const quizData = await response.json();

    displayQuiz(quizData.results);
}

function displayQuiz(questions) {
    const quizForm = document.getElementById('quizForm');
    quizForm.style.display = 'block';
    quizForm.innerHTML = '';

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        
        questionElement.setAttribute('data-correct-answer', question.correct_answer);
        questionElement.innerHTML = `<h3>Question ${index + 1}: ${question.question}</h3>`;

        const options = [...question.incorrect_answers, question.correct_answer];
        options.sort(() => Math.random() - 0.5);

        options.forEach(option => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="q${index + 1}" value="${option}"> ${option}`;
            questionElement.appendChild(label);
        });

        quizForm.appendChild(questionElement);
    });

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.type = 'button';
    submitButton.onclick = calculateScore;
    quizForm.appendChild(submitButton);

    startTimer(questions.length);
}


function calculateScore() {
    const form = document.getElementById('quizForm');
    const questions = form.getElementsByClassName('question');
    let score = 0;

    Array.from(questions).forEach((question, index) => {
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');
        const correctAnswer = question.getAttribute('data-correct-answer');  // Get the correct answer

        if (!correctAnswer) {
            console.error(`Correct answer for question ${index + 1} not found!`);
            return;
        }

        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
            score += 1;
        }

        const correctLabel = question.querySelector(`input[value="${correctAnswer}"]`).closest('label');
        if (correctLabel) {
            correctLabel.classList.add('correct-answer');
        }
    });

    document.getElementById('scoreDisplay').innerText = `Your score: ${score}`;
    window.scrollTo(0, 0);
    clearInterval(timerInterval);
}




function startTimer(numQuestions) {
    const timerElement = document.getElementById('timer');
    let timeRemaining = numQuestions * 60;
    
    const timerInterval = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        timerElement.textContent = `Time: ${minutes}:${seconds}`;
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            calculateScore();
        }
        
        timeRemaining--;
    }, 1000);
}
