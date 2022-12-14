/* const form = document.forms['todo'];
form.addEventListener('submit', addTask, false);

function addTask(event) {
  event.preventDefault();
  const content = form.task.value;
  const task = {
    userId: 1,
    title: content,
    completed: false
  }
  const data = JSON.stringify(task);

  const headers = new Headers({
    'Accept': 'application/json',
    'Content-type': 'application/json'
  });

  const request = new Request(form.action, {
    method: form.method,
    headers: headers,
    body: data
  })

  fetch(request)
  .then(response => response.json())
  .then(task => console.log(`Task saved with an id of ${task.id}`))
  .catch(error => console.log('There was an error:', error));
} */

const form = document.forms['todo'];

form.addEventListener('sumbit', addTask, false);

function addTask(event) {
  event.preventDefault();
  const task = new FormData(form);
  const url = `http://echo.jsontest.com/id/1/title/${form.task.value}`;
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const request = new Request(url, {
    method: form.method,
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(task) 
  })

  fetch(request)
  .then(response => response.json())
  .then(data => console.log(`${data.title} saved with an id of ${data.id}`))
  .catch(error => console.log('There was an error:', error));
}