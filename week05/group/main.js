import Hikes from './hikes.js';

const hikes = new Hikes('hikes')
//on load grab the array and insert it into the page
window.addEventListener("load", () => {
  hikes.showHikeList();
});


