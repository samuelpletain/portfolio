const URL = 'wss://socketsbay.com/wss/v2/2/demo/'
const outputDiv = document.getElementById('output')
const form = document.forms[0]
const connection = new WebSocket(URL)

connection.addEventListener('open', () => { 
  output('CONNECTED')
})

form.addEventListener('submit', message, false)

function output(message) {
  const p = document.createElement('p')
  p.textContent = message
  outputDiv.append(p)
}

function message(event) {
  event.preventDefault();
  const text = form.message.value
  output(`SENT: ${text}`)
  connection.send(text)
}

connection.addEventListener('message', (event) => {
  console.log(event.data)
  output(`RESPONSE: ${event.data}`)
}, false)