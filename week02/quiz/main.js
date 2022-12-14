// alert('Welcome to Quiz Ninja!');

/* Chapter 2

const question = "What is Superman's real name?";
const answer = prompt(question);
alert(`You answered: ${answer}.`);
*/

// Chapter 3

const quizz = [
  ["What is Superman's real name?","Clark Kent"],
  ["What is Wonder Woman's real name?","Diana Prince"],
  ["What is Batman's real name?","Bruce Wayne"]
];

/*
let score = 0;

for (const [question, answer] of quizz) {
  const reponse = prompt(question);
  if (reponse === answer) {
    alert('Correct!');
    score++;
  } else {
    alert(`Wrong! The correct answer was ${answer}.`);
  }
}

// Use of template litterals and ternary operator to display the score and have the correct spelling based on points value.
alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}.`);
*/

// Chapter 4
function start(quizz) {
  let score = 0;

  for (const [question, answer] of quizz) {
    const response = ask(question);
    check(response, answer);
  }

  gameOver();

  function ask(question) {
    return prompt(question);
  }
  
  function check(response, answer) {
    if (response === answer) {
      alert('Correct!');
      score++;
    }
    else {
      alert(`Wrong! The correct answer was ${answer}.`)
    }
  }

  function gameOver() {
    alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}.`);
  }
}

start(quizz);


