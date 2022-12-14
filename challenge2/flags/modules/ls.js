const ls = {
  saveData(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getSavedData(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }
}

export default ls;