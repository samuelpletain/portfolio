import ls from './ls.js'

export default class Scores {
  constructor() {
    this.region = ''
    this.scores = ls.getSavedData('scores') ?? {
      'Europe': 0,
      'Asia': 0,
      'All': 0,
      'Africa': 0,
      'Antarctic': 0,
      'Oceania': 0,
      'Americas': 0
    }
  }

  updateScore(score) {
    if (score > this.scores[this.region]) {
      this.scores[this.region] = score
      ls.saveData('scores', this.scores)  
    }
  }

  getScore(region) {
    return this.scores[region]
  }

  setRegion(region) {
    this.region = region
  }
}