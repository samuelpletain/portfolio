import ls from './ls.js'

export default class Flags {
  constructor(dataset) {
    if (!ls.getSavedData('flags')) {
      ls.saveData('flags', dataset)
    }
    this.dataset = dataset
    this.regions = []
    this.setRegions(this.dataset)
  }

  static async build(url) {
    const dataset = ls.getSavedData('flags') ?? await this.getFlags(url)
    return new Flags(dataset)
  }
  
  static async getFlags(url) {
    let dataset
    await fetch(url)
      .then(response => response.json())
      .then(data => dataset = data)
      .catch(error => console.log(error))

    let res = []
    for(let country of dataset) {
      res.push((({name, flags, region})=>({name, flags, region}))(country))
    }
    res.sort((a, b) => a.name.common.localeCompare(b.name.common))
    return res
  }

  getDataset() {
    return this.dataset
  }

  setRegions(dataset) {
    let res = {}
    for(let country of dataset) {
      if (country.region in res) {
        res[country.region].push(country)
      } else {
        res[country.region] = [country]
      }
    }
    this.regions = res
  }

  getRegions() {
    return this.regions
  }

  getRegionFlags(region) {
    return this.regions[region]
  }

  getFilteredDataset(filter) {
    return this.dataset.filter(obj => obj.name.common.toLowerCase().includes(filter))
  }

  getFilteredDatasetRegion(region) {
    return this.dataset.filter(obj => console.log(obj.region !== region)) 
  }
}