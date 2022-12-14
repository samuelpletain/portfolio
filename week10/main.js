const email = document.getElementById('mail')

email.addEventListener('input', (event) => {
  // Check if input is not valid
  if (email.validity.typeMismatch) {
    email.setCustomValidity('I am expecting an e-mail address!')
    email.reportValidity()
  } else {
    email.setCustomValidity('')
  }
})