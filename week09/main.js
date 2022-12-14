// Chapter 9

// The Browser Object Model is a collection of properties and methods that contains information about the browser and computer screen, available through the window object.
console.log(window);

// Global variables are a part of the window object
name = 'Samuel';
console.log(window.name);

// It's better to not use window to acces global variables, except when checking if it has been defined.

// alter, prompt and confirm stop the execution of the program.

console.log(window.navigator.userAgent)

// The location property is an object containing information about the URL of the current page such as the hostname, protocol used, query parameters, etc.   
console.log(window.location)

console.log(window.location.toString())

// The history property allows to access any previously visited pages in the current browser session.
console.log(`Number of pages visited before arriving on this page, this page included : ${window.history.length}`) 

// window.history.go(X) allows to move X amount of pages. If X is positive, it goes forward, if negative, backward, and if equals to 0 reloads the current page. window.history.go(1) is the same as window.history.forward(), and window.history.go(-1) as window.history.back()


const popUpButton = document.getElementById('button')
popUpButton.addEventListener('click', () => window.open('https://www.sitepoint.com', 'Sitepoint', 'width=400, height=400, resizable=yes'))
/*
setInterval(() => {
  popup.close()
}, 5000)
*/

// moveTo to move the window, resize to resize it 

// Get width and height of the window
console.log(window.screen.width, window.screen.height)

// Without operating menus
console.log(window.screen.availWidth, window.screen.availHeight)

// Using document.write is considered bad practice.

// Creating a cookie
document.cookie = 'name=John'
document.cookie = 'lastName=Doe'

// Changing the value of an existing cooking
document.cookie = 'name=Samuel'

// Reading cookies
console.log(document.cookie)

const cookies = document.cookie.split('; ')
for (crumb of cookies) {
  const [key, value] = crumb.split('=')
  console.log(`The value of ${key} is ${value}`)
}

// Cookies are delete once a browser session is finished. We need to set a expiration date if we want them to persist over time. This is not a secure way to get rid of the data as some browser can retrieve it even after expiration.
const expirationDate = new Date()
const tomorrow = expirationDate + 1000 * 60 * 60 * 24
expirationDate.setTime(tomorrow)

document.cookie = `name=John; expires=${expirationDate.toUTCString()}`

// To access a cookie from any page of the website, a path or domain needs to be set
document.cooke = 'name=John; path=/'
document.cooke = 'name=John; domain=sitepoint.com'

// To ensure the cookie is only trasmitted over HTTPS, it needs to be set as secure
document.cooke = 'name=John; secure'

// To delete a cookie, it needs to have its expiration date set in the past
document.cookie = 'name=John; expires=Thu, 01 Jan 1970 00:00:01 GMT';

// Chapter 14

// LocalStorage (see challenge 1)

// Geolocalisation
navigator.geolocation.getCurrentPosition(youAreHere)

function youAreHere(position) {
  console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}.`)
}

// Other properties: speed, altitude, heading, timestamp, accuracy (returns the accurary of latitude and longitude in meters), altitudeAccuracy, watchPosition(callback) (call the callback function everytime the position is updated), clearWatch(id) (stops the callback from being called)

// Web workers
// Web workers allow to do some heavy lifting without letting the application hang. To do so, we define a new Worker object that takes a file as an argument.
//const worker = new Worker('task.js')

// Sending data to the worker. 
//worker.postMessage('Some data')

// Getting data from the worker (in the js file used).
//self.postMessage('Result')

// We can catch the result with the 'message' event listener. The data is found in event.data

// Stopping the worker once it is done working
//worker.terminate()
// Or from inside the js file
//self.close()

// Web sockets

// See web.html

// Audio and video

// See group assignment

// Canvas

// See last week's notes