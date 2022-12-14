const quiz = [
  { name: "Superman", realName: "Clark Kent"},
  { name: "Wonder Woman", realName: "Diana Price"},
  { name:  "Batman", realName: "Bruce Wayne"},
];

const view = {
  score: document.querySelector('#score strong'),
  question: document.querySelector('#question'),
  result: document.querySelector('#result'),
  info: document.querySelector('#info'),
  start: document.querySelector('#start'),
  response: document.querySelector('#response'),
  render(target, content, attributes) {
    for (const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content; 
  },
  hide(element) {
    element.style.display = 'none';
  },
  show(element) {
    element.style.display = 'block'
  },
  setup() {
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
    this.render(this.score, game.score);
    this.render(this.result, '');
    this.render(this.info, '');
    this.resetForm();
  },
  resetForm() {
    this.response.answer.value = '';
    this.response.answer.focus();
  },
  tearDown() {
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  }
}

const game = {
  start(quiz) {
    this.score = 0;
    this.questions = [...quiz];
    view.setup();
    this.ask();
  },
  ask(name) {
    if (this.questions.length > 0) {
      this.question = this.questions.pop();
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question, question);
    } else {
      this.gameOver();
    }
  },
  check(event) {
    event.preventDefault();
    const response = view.response.answer.value;
    const answer = this.question.realName;
    if (response === answer) {
      view.render(view.result, 'Correct!', {'class': 'correct'});
      this.score++;
      view.render(view.score, this.score);
    } else {
      view.render(view.result, `Wrong! The correct answer is ${this.question.realName}.`, {'class': 'wrong'});
    }
    view.resetForm();
    this.ask();
  },
  gameOver() {
    view.render(view.info, `Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}.`);
    view.tearDown();
  }
}

view.start.addEventListener('click', () => game.start(quiz), false);
view.response.addEventListener('submit', (event) => game.check(event), false);
view.hide(view.response);
