export default class Comments {
  constructor(type, elementId) {
    this.type = type;
    this.parentElement = document.getElementById(elementId);
  }
}