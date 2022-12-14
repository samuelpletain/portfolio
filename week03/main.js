/* https://javascript.info/object-methods
this is unbound, meaning I can use it outside of an object. It is evaluated at runtime.
Arrow functions have no this. If an arrow function is used inside a regular, its value is taken from the regular function it belongs to. 
*/
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => console.log(this.firstName);
    arrow();
  }
};

user.sayHi();

// Chapter 5

// ES6 object creation
const firstName = 'Samuel';
const lastName = 'Pletain';
user = {firstName, lastName};
console.log(user);

// Computed properties keys with []
const hero = {name: 'Hulk', ['catch' + 'Phrase']: 'Hulk Smash!'};
console.log(hero); 
// Use with a Symbol
const name = Symbol('name');
const newHero = {[name]: 'Batman'};
console.log(newHero);

// Check if property exist
console.log('lastName' in user);
console.log('middleName' in user);

// Check if property exist and was not inherited from another object
console.log(user.hasOwnProperty('lastName'));

// ES2017 way to iterate over key/value pair
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}

// Function with object litteral as a parameter
function greet({greeting, name, age}) {
  return `${greeting}! My name is ${name} and I am ${age} years old.`;
} 
console.log(greet({greeting: 'Hi everyone', name: 'Samuel', age: 32}));

// The exec() method returns an array containing the first match and the index if found, null otherwise.
const pattern = new RegExp('joking');
console.log(pattern.exec('joke'));
console.log(pattern.exec('joking'));
console.log(pattern.exec('I am joking'));

// Capturing matched groups with ()
const link = "<a href='https://www.sitepoint.com' title='Oh Yeah!'>Awesome Web Resources</a>"
const mdLink = link.replace(/<a href='(.*?)'.*?>(.*?)<\/a>/g, "[$2]($1)");

console.log(link)
console.log(mdLink)

/* Chapter 6
const body = document.body  
Node types (body.nodeType):
1. element
2. attribute
3. text
8. comment
9. body

Node list are not arrays, no function such as splce(). Possibility to transform to an array with Array.from() or the spread operator.

toggle() can be used classList to remove or add a class.

Create an element and append content
const flash = document.createElement('li');
flash.textContent = 'Flash';
*/

// Chapter 7

// event.type to get the event type
// event.target to get the target of the event
addEventListener('click', doSomething)

function doSomething(event) {
  console.log(event.type);
  console.log(event.target);
  console.log(`screen: (${event.screenX},${event.screenY}), page: (${event.pageX},${event.pageY}), client: (${event.screenX},${event.screenY})`);
}

/* If I want to remove an event listener, I need a named function

Two types of event propagation
1. Bubbling
Default behavior. The even starts from the clicked element all the way to the root. If I click on the li of an ul that has an event listener attached to it, the event will get caught by the ul because of bubbling. This behavior can be stopped with event.stopPropagation()
2. Capturing
ulElement.addEventListener('click', (event) => console.log('Clicked on ul'),true);
Activated with the optionnal third parameter of addEventListener. With this type, the event propagates downward, all the way to the clicked element. 

Event Delegation
Attaching an event listener to the parent, then using the target property is a good solution to avoid writing repetitive event listener (event on ul instead of X li for example).
*/