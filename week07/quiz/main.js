const url = 'https://spbooks.github.io/jsninja2/questions.json'

fetch(url)
.then(res => res.json())
.then(quiz => {
  view.start.addEventListener('click', () => game.start(quiz.questions), false);
  view.response.addEventListener('click', (event) => game.check(event), false);
})

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

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
  },
  tearDown() {
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  },
  buttons(array){
    return array.map(value => `<button>${value}</button>`).join('');
  }
}

const game = {
  start(quiz) {
    this.score = 0;
    this.questions = [...quiz];
    view.setup();
    this.ask();
  },
  ask() {
    if (this.questions.length > 2) {
      shuffle(this.questions);
      this.question = this.questions.pop();
      const options = [this.questions[0].realName, this.questions[1].realName, this.question.realName];
      shuffle(options);
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question,question);
      view.render(view.response,view.buttons(options));
    } else {
      this.gameOver();
    }
  },
  check(event) {
    console.log('check(event) invoked');
    const response = event.target.textContent;
    const answer = this.question.realName;
    if(response === answer){
      view.render(view.result,'Correct!',{'class':'correct'});
      this.score++;
      view.render(view.score,this.score);
    } else {
      view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
    }
    this.ask();
  },
  gameOver() {
    view.render(view.info, `Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}.`);
    view.tearDown();
  }
}