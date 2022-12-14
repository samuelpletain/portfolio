import Flags from "./flags.js"
import Quiz from "./quiz.js"
import beforeIcon from '../icons/previous.svg'
import afterIcon from '../icons/next.svg'
import backIcon from '../icons/back.svg'
import flagIcon from '../icons/flag.svg'
import flashcardIcon from '../icons/flashcard.svg'
import quizIcon from '../icons/quiz.svg'
import filterIcon from '../icons/filter.svg'
import Scores from "./score.js"

export default class View {
  constructor(parent, flags) {
    this.flags = flags
    this.parent = parent
    this.flashcardPos = 0
    this.flashcardX = 0
    this.links = []
    this.scores = new Scores()
    this.filtered = flags.dataset
    this.filter = ""
  }l

  static async build(url, parent) {
    const flags = await Flags.build(url)
    return new View(parent, flags)
  }

  createElem(elem, classes, content=null) {
    const element = document.createElement(elem)
    element.classList.add(classes)
    if (content) {
      element.textContent = content
    }
    return element
  }

  renderHome(links) {
    this.links = links
    this.parent.innerHTML = ''
    const main = this.createElem('main', 'main')
    const title = this.createElem('h1', 'title', 'Fun with Flags')
    const container = this.createElem('div', 'cards_container')
    for (let link of this.links) {
      const card = this.createElem('div', 'card')
      const icon = this.createElem('img', 'icon')
      icon.src = link.icon
      const header = this.createElem('h2', 'category', link.title)
      card.append(icon, header)
      card.addEventListener('click', () => {
        link.render(this.parent)
      })
      container.append(card)
    }
    main.append(title, container)
    this.parent.append(main)
  }

  renderFlags() {
    this.parent.innerHTML = ''
    this.filter = ''
    this.filtered = this.flags.dataset
    const dataset = this.filtered
    const main = this.createElem('main', 'main')
    const mainContainer = this.createElem('div', 'mainDiv')
    mainContainer.id = 'mainDiv'
    const titleContainer = this.createElem('div', 'titleContainer')
    const title = this.createElem('h1', 'title', 'Flags')
    const icon = this.createElem('img', 'filter_icon')
    const form = this.renderFilterForm(this.flags.regions)
    titleContainer.append(title, icon)
    const container = this.renderFlagContainer(dataset)
    container.id = 'flag_container'
    mainContainer.append(titleContainer, container)
    main.append(mainContainer, form)
    const footer = this.renderFooter()
    this.parent.append(main, footer)
  }

  renderFlashcards() {
    this.parent.innerHTML = ''
    const main = this.createElem('main', 'main')
    const title = this.createElem('h1', 'title', 'Flashcards')
    const container = this.createElem('div', 'region_container')
    for (let region in this.flags.getRegions()) {
      const div = this.createElem('div', 'region')
      const img = this.createElem('img', 'region__image')
      img.src = `./img/${region}.svg`
      const name = this.createElem('a', 'region__name', region)
      div.append(img, name)
      div.dataset.region = region
      img.dataset.region = region
      name.dataset.region = region
      div.addEventListener('click', (event) => {
        this.renderFlashcard(event.target.dataset.region)
      }) 
      container.append(div)           
    }    
    main.append(title, container)
    
    const footer = this.renderFooter()
    this.parent.append(main, footer)
  }

  renderQuizzes() {
    this.parent.innerHTML = ''
    const main = this.createElem('main', 'main')
    const title = this.createElem('h1', 'title', 'Quizzes')
    const container = this.createElem('div', 'region_container')
    const div = this.createElem('div', 'region')
    const img = this.createElem('img', 'region__image')
    img.src = `./img/earth.jpg`
    const name = this.createElem('a', 'region__name', 'All')
    const divName = this.createElem('div', 'region_cont') 
    const displayScore = this.createElem('p', 'best_score', `Best score: `)
    const score = this.scores.getScore('All')
    const span = this.createElem('span', 'score_bad', `${score}/15`)
    span.classList.add(score < 5 ? "score_bad" : score < 10 ? "score_medium" : "score_good") 
    displayScore.append(span)
    divName.append(name, displayScore)
    div.append(img, divName)
    div.dataset.region = 'All'
    div.addEventListener('click', (event) => {
      this.scores.setRegion('All')
      this.renderQuiz(div.dataset.region)
    }) 
    container.append(div)           
    for (let region in this.flags.getRegions()) {
      const div = this.createElem('div', 'region')
      const img = this.createElem('img', 'region__image')
      img.src = `./img/${region}.svg`
      const divName = this.createElem('div', 'region_cont') 
      const name = this.createElem('a', 'region__name', region)
      const displayScore = this.createElem('p', 'best_score', `Best score: `)
      const score = this.scores.getScore(region)
      const span = this.createElem('span', 'score_bad', `${this.scores.getScore(region)}/${region === 'Antarctic' ? 5 : 15}`)
      if (region === 'Antarctic') {
        span.classList.add(score < 2 ? "score_bad" : score < 4 ? "score_medium" : "score_good") 
      } else {
        span.classList.add(score < 5 ? "score_bad" : score < 10 ? "score_medium" : "score_good") 
      }
      displayScore.append(span)
      divName.append(name, displayScore)
      div.append(img, divName)
      div.dataset.region = region
      div.addEventListener('click', (event) => {
        this.scores.setRegion(region)
        this.renderQuiz(div.dataset.region)
      }) 
      container.append(div)           
    }    
    main.append(title, container)
    
    const footer = this.renderFooter()
    this.parent.append(main, footer)
  }

  renderQuiz(region) {
    const backButton = this.renderBackLink('Quizzes')
    backButton.addEventListener('click', () => {
      this.renderQuizzes()
    })
    const quiz = region === 'All' ? new Quiz(this.flags.getDataset(), 15) : new Quiz(this.flags.getRegionFlags(region), 15)
    this.parent.innerHTML = ''
    const main = this.createElem('main', 'main')
    const title = this.createElem('h1', 'title', `Quiz - ${region}`)
    const score = this.createElem('p', 'score', `Score: `)
    const span = this.createElem('span', 'score_bad', `0/${quiz.quiz.answers.length}`)
    score.append(span)
    
    const container = this.createElem('div', 'question_container')
    this.renderQuestion(container, quiz, span)
  
    const reset = this.createElem('button', 'reset_button', "Start Over")
    reset.id = 'reset'
    reset.classList.add('is-hidden')
    reset.addEventListener('click', () => {
      this.renderQuiz(region)
    })
    main.append(backButton, title, container, score, reset)
    const footer = this.renderFooter()
    this.parent.append(main, footer)
  } 

  renderQuestion(container, quiz, score) {
    container.innerHTML = ''
    const questionNumber = this.createElem('p', 'question_number', `Question ${quiz.currentQuestion + 1}/${quiz.quiz.answers.length}`)
    const question = this.createElem('p', 'question')
    const answer = this.createElem('div', 'answer')
    const answersContainer = this.createElem('div', 'answers_container')
    answersContainer.id = 'answers_container'
    if (quiz.generateQuestionType()) {
      question.textContent =  `What is the flag of ${quiz.getAnswerCountry()}?`
      const flags = quiz.getChoicesFlags()
      for(let i = 0; i < flags.length; i++) {
        const flagCard = this.createElem('div', 'flag_card')
        flagCard.dataset.id = i
        const img = this.createElem('img', 'flag')
        img.src = flags[i]
        img.dataset.id = i
        flagCard.addEventListener('click', (event) => this.addAnswerEventListener(event, quiz, score, container, flagCard))
        flagCard.append(img)
        answersContainer.append(flagCard)
      }
      container.append(questionNumber, question, answer, answersContainer)
    } else {
      question.textContent = 'To what contry does this flag belong?'
      const img = this.createElem('img', 'flag_question') 
      img.src = quiz.getAnswerFlag()
      const countries = quiz.getChoicesCountries()
      for(let i = 0; i < countries.length; i++) {
        const country = this.createElem('p', 'country_answer', countries[i])
        country.dataset.id = i
        country.addEventListener('click', (event) => {
          this.addAnswerEventListener(event, quiz, score, container, country)
        })
        answersContainer.append(country)
      }
      container.append(questionNumber, question, img, answersContainer)
    }
    return container
  }

  renderFlashcard(region) {
    this.flashcardPos = 0
    this.parent.innerHTML = ''
    const flashcards = this.flags.getRegionFlags(region)
    const backLink = this.renderBackLink('Flashcards')
    backLink.addEventListener('click', () => {
      this.renderFlashcards()
    })
    const main = this.createElem('main', 'main')
    main.style.overflowX = 'hidden'
    const title = this.createElem('h1', 'title', flashcards[0].region)
    const container = this.createElem('div', 'flashcards_container')
    const flashcard = this.createElem('div', 'flashcard')
    container.addEventListener('click', (e) => {
      flashcard.classList.toggle('is-flipped')
    })
    const name = this.createElem('p', 'flashcard__name', flashcards[0].name.common)
    const flag = this.createElem('img', 'flashcard__flag')
    flag.src = flashcards[0].flags.png
    const front = this.createElem('div', 'flashcard_front')
    const back = this.createElem('div', 'flashcard_back')
    front.append(flag)
    back.append(name)
    flashcard.append(front, back)
    container.append(flashcard)
    const navContainer = this.createElem('div', 'navigation')
    const before = this.createElem('img', 'navigation__arrow')
    before.src = beforeIcon
    const card = this.createElem('p', 'navigation__content', `${this.flashcardPos + 1}/${flashcards.length}`)
    const after = this.createElem('img', 'navigation__arrow')
    after.src = afterIcon
    before.addEventListener('click', () => {
      if (this.flashcardPos > 0) {
        flashcard.classList.remove('is-flipped')
        setTimeout(() => {
          this.flashcardPos--
          name.textContent = flashcards[this.flashcardPos].name.common
          flag.src = flashcards[this.flashcardPos].flags.png
          card.textContent = `${this.flashcardPos + 1}/${flashcards.length}`
        }, 125)
      }
    })
    after.addEventListener('click', () => {
      if (this.flashcardPos < flashcards.length - 1) {
        flashcard.classList.remove('is-flipped')
        setTimeout(() => {
          this.flashcardPos++
          name.textContent = flashcards[this.flashcardPos].name.common
          flag.src = flashcards[this.flashcardPos].flags.png
          card.textContent = `${this.flashcardPos + 1}/${flashcards.length}`
        }, 125)
        
      } 
    })
    navContainer.append(before, card, after)
    main.append(backLink, title, container, navContainer)
    const footer = this.renderFooter()
    this.parent.append(main, footer)
  }

  renderBackLink(title) {
    const img = this.createElem('img', 'back_icon')
    img.src = backIcon
    const backLink = this.createElem('a', 'back_link', title)
    backLink.prepend(img)
    return backLink
  }

  renderFooter() {
    const footer = this.createElem('footer', 'footer')
    for (let link of this.links) {
      const img = this.createElem('img', 'footer_icon')
      img.src = link.icon
      img.addEventListener('click', () => {
        window.scrollTo(0,0);
        link.render(this.parent)
        this.filter = ""
        this.filtered = this.flags.dataset
      })
      footer.append(img)
    }
    return footer
  }

  addAnswerEventListener(event, quiz, score, container, element) {
    const answers = document.getElementById('answers_container')
    console.log(answers.childNodes)
    answers.childNodes.forEach(node => {
      if (quiz.checkAnswerWithId(node.dataset.id)) {
        node.style.borderColor = '#13AE19'
      }
    })
    quiz.checkAnswer(event.target.dataset.id) ? element.classList.add('right') : element.classList.add('wrong')
    score.textContent = `${quiz.score}/${quiz.quiz.answers.length}`
    let scoreStyle = ""
    if (quiz.quiz.answers.length === 5) {
      scoreStyle = quiz.score < 2 ? "score_bad" : quiz.score < 4 ? "score_medium" : "score_good"
    } else {
      scoreStyle = quiz.score < 5 ? "score_bad" : quiz.score < 10 ? "score_medium" : "score_good"
    }
    score.className = scoreStyle
    const oldElem = container
    const newElement = container.cloneNode(true);
    container.parentNode.replaceChild(newElement, oldElem);
    if (quiz.quiz.answers.length === quiz.currentQuestion) {
      const reset = document.getElementById('reset')
      reset.classList.remove('is-hidden')
      this.scores.updateScore(quiz.score)
    }
    setTimeout(() => {
      if (quiz.quiz.answers.length > quiz.currentQuestion) {
        this.renderQuestion(newElement, quiz, score)
      }
    }, 2000)          
  }

  renderFilterForm(regions) {    
    const form = this.createElem('form', 'filter_form')
    form.classList.add('is-closed')
    form.addEventListener('click', () => {
      form.classList.remove('is-closed')
      const div = document.getElementById('mainDiv')
      div.addEventListener('click', () => {
        console.log('test')
        form.classList.add('is-closed')
      })
    }) 
    const label = this.createElem('label', 'label')
    const filterImage = this.createElem('img', 'filter_icon')
    filterImage.src = filterIcon
    label.append(filterImage)
    const search = this.createElem('input', 'search')
    search.placeholder = "Type a country name..."
    search.value = this.filter
    search.addEventListener('input', () => {
      this.filter = search.value
      this.filtered = this.flags.getFilteredDataset(search.value)
      console.log(this.filtered)
      const container = document.getElementById('flag_container')
      const main = document.getElementById('mainDiv')
      main.replaceChild(this.renderFlagContainer(this.filtered), container)
    })
    form.append(label, search)
    return form
  }

  renderFlagContainer(dataset) {
    const container = this.createElem('div', 'flags_container')
    container.id = 'flag_container'
    for (let country of dataset) {
      const div = this.createElem('div', 'country')
      const img_container = this.createElem('div', 'flag_container')
      const flag = this.createElem('img', 'country__flag')
      flag.src = country.flags.png
      const name = this.createElem('p', 'country__name', country.name.common)
      img_container.append(flag)
      div.append(img_container, name)
      container.append(div)
    }
    return container
  }
}