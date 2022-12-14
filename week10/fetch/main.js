fetch('https://raw.githubusercontent.com/vega/vega/main/docs/data/movies.json')
  .then((response) => response.json())
  .then((data) => console.log(data));

/*
POST JSON example

const data = {
  username: 'example'
}

fetch('https://example.com/profile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => console.log('Success:', data))
  .catch((error) => console.log('Error:', error))
*/

/*
Uploading a file example
const formData = new FormData()
const fileField = document.querySelector('input[type="file"]')

formData.append('username', 'user1')
formData.append('avatar', fileField.files[0])

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData // Pass the 
})
  .then((response) => response.json())
  .then((result) => console.log('Success:', result))
  .catch((error) => console.log('Error:', error))
*/

// response.ok lets us check if the promise resolved or not

fetch("https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=Belgium&limit=5")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network was unresponsive.')
    }
    return response.json()
  })
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error))