export default class Quiz {
  constructor(dataset, size) {
    this.size = size
    this.dataset = dataset
    this.score = 0
    this.currentQuestion = 0
    this.quiz = this.generateQuiz(size)
  }

  resetQuiz() {
    this.score = 0
    this.currentQuestion = 0
    this.quiz = this.generateQuiz(this.size)
  }

  getRandomFlag() {
    return this.dataset[Math.floor(Math.random()*this.dataset.length)]
  }

  generateRandomFlags(size) {
    let n = 0
    let set = []    
    while(n < size) {
      const flag = this.getRandomFlag() 
      if (!set.some(f => f.name.common === flag.name.common)) {
        set.push(flag)
        n++
      }
    }
    return set
  }

  generateQuestion(answer) {
    const question = []
    question.push(answer)
    let n = 0
    while (n < 3) {
      const wrongFlag = this.getRandomFlag()
      if(!(answer.name.common === wrongFlag.name.common) && (!question.some(f => f.name.common === wrongFlag.name.common))) {
        question.push(wrongFlag)
        n++
      }
    }
    return question
  }

  generateQuiz(size) {
    size = size >= this.dataset.length ? this.dataset.length : size
    const quiz = {}
    quiz.answers = this.generateRandomFlags(size)
    const set = []
    for(let i = 0; i < size; i++) {
      const question = this.shuffle(this.generateQuestion(quiz.answers[i]))
      set.push(question)
    }
    quiz.set = set
    return quiz
  }

  shuffle(array) {
    let currentIndex = array.length, randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }

  checkAnswer(answer) {
    if (this.checkAnswerWithId(answer)) {
      this.score++
      this.currentQuestion++
      return true
    }
    else {
      this.currentQuestion++
      return false  
    }
  }

  checkAnswerWithId(id) {
    console.log(this.quiz.set[this.currentQuestion][id].name.common, this.quiz.answers[this.currentQuestion].name.common)
    return this.quiz.set[this.currentQuestion][id].name.common === this.quiz.answers[this.currentQuestion].name.common
  }

  generateQuestionType() {
    return (Math.random() < 0.5) ? true : false
  }

  getAnswerCountry() {
    return this.quiz.answers[this.currentQuestion].name.common
  }

  getAnswerFlag() {
    return this.quiz.answers[this.currentQuestion].flags.png
  }

  getChoicesCountries() {
    let res = []
    for(let flag of this.quiz.set[this.currentQuestion]) {
      res.push(flag.name.common)
    }
    return res
  }

  getChoicesFlags() {
    let res = []
    for(let flag of this.quiz.set[this.currentQuestion]) {
      res.push(flag.flags.png) 
    }
    return res
  }
}