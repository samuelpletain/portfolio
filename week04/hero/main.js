const form = document.forms['hero'];
form.addEventListener('submit', makeHero, false);

function makeHero(event) {
  event.preventDefault();
  
  const hero = {};

  hero.name = form.heroName.value;
  hero.realName = form.realName.value;
  // I need to use map to get the value, otherwise I get a list of empty objects
  hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);
  hero.category = form.category.value;
  hero.age = form.age.value;
  hero.city = form.city.value;
  // form.city.selectedIndex to get the value's index
  hero.origin = form.origin.value; 

  alert(JSON.stringify(hero));
  return hero;
}

// Pre-checking radio or checkboxes with JS
form.powers[0].checked = true;
form.category[2].checked = true;

// Inline form validation
const label = form.querySelector('label')
const error = document.createElement('div')
error.classList.add('error')
error.textContent = "! Your name is not allowed to start with X."
label.append(error)

function validateInline() {
  const heroName = this.value.toUpperCase()
  if (heroName.startsWith('X')) {
    error.style.display = 'block'
  } else {
    error.style.display = 'none'
  }
}

// Submit button disabling
function disableSubmit(event) {
  if (event.target.value === '') {
    document.getElementById('submit').disabled = true
  } else {
    document.getElementById('submit').disabled = false
  }
}

form.heroName.addEventListener('keyup', disableSubmit, false)

form.heroName.addEventListener('keyup', validateInline, false)