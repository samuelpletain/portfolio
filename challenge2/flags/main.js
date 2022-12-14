import './scss/style.scss'
import flagIcon from './icons/flag.svg'
import flashcardIcon from './icons/flashcard.svg'
import quizIcon from './icons/quiz.svg'
import View from './modules/view.js'
import Flags from './modules/flags.js'

const URL = 'https://restcountries.com/v3.1/all'
const app = document.getElementById('app')

const view = await View.build(URL, app)

const links = [
  {
    title: 'Flags',
    icon: flagIcon,
    render: function(app) {
      view.renderFlags()
    }
  },
  {
    title: 'Flashcards',
    icon: flashcardIcon,
    render: function(app) {
      view.renderFlashcards()
    }
  },
  {
    title: 'Quizzes',
    icon: quizIcon,
    render: function(app) {
      view.renderQuizzes(app)
    }
  }
]

view.renderHome(links)