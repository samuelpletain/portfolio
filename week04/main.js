// Chapter 8
const form = document.forms['search'];
const [input, button] = form.elements;
console.log(input, button);

// Reset buttons in form are considered poor for usability.
input.addEventListener('focus', () => console.log('focused'), false);
input.addEventListener('blur', () => console.log('blured'), false);
input.addEventListener('change', () => console.log('changed'), false);

form.addEventListener('submit', search, false);

function search() {
  alert(`You searched for: ${input.value}.`);
  event.preventDefault();
}

input.value = 'Search here'
input.addEventListener('focus', () => {
  if (input.value === 'Search here') {
    input.value = '';
  }
}, false);

input.addEventListener('blur', () => {
  if (input.value === '') {
    input.value = 'Search here';
  }
}, false);

// Chapter 12
/* 
const Dice = function(sides=6) {
  this.sides = sides;
  this.roll = function() {
    return Math.floor(this.sides * Math.random() + 1);
  };
}
*/

// ES6 class
class Dice {
  constructor(sides=6) {
    this.sides = sides;
  }

  roll() {
    return Math.floor(this.sides * Math.random() + 1);
  }

  // Static methods are class methods (only used by the class, not the instances)
  static description() {
    return 'A way of choosing random numbers.'
  }
}

const redDice = new Dice;
const whiteDice = new Dice(4);

console.log(redDice instanceof Dice);
console.log(redDice.sides);
console.log(redDice.roll());
console.log(Dice.description());

// Prototype property is an object shared by  all the instances of the class.
console.log(Object.getPrototypeOf(redDice))
console.log(Dice.prototype.isPrototypeOf(whiteDice))
Dice.prototype.color = "white";
console.log(whiteDice.color);
console.log(redDice.color);

// Adding a property with the same name to an instance of the class will override the prototype property. 
redDice.color = "red";
console.log(redDice.color);
console.log(redDice.hasOwnProperty('color'));
console.log(whiteDice.hasOwnProperty('color'));

// Never use arrays or objects as a default value in prototype.

// Private properties
class Turtle {
  constructor(name,color) {
    this.name = name;
    let _color = color; // Private property
    this.setColor = color => { 
      if (typeof color === 'string') { // Setter
        return _color = color;
      } else {
        throw new Error('Color must be a string');
      }}
    this.getColor = () => {}; // Getter
  }
}

/* If properties aren't enumerable, they won't show up in a for-in loop. Object.prototype isn't enumerable.
Good practice: Built-in methods: non-enumerables, user-defined methods: numerables

I can add methods to built-in objects: 
*/
Number.prototype.isEven = function () {
  return this%2 === 0;
};

console.log(4..isEven());

const me = {name: 'Sam'};
me.age = 32;
// Object properties have 4 attributes stored in a property descriptor object: value, writable, enumerable, and configurable. The last 3 attributes are set as true by default. 
console.log(Object.getOwnPropertyDescriptor(me, 'name'));
Object.defineProperty(me, 'eyeColor', {value: 'brown', writable: false, enumerable: true});
console.log(me);
me.eyeColor = 'purple';
console.log(me.eyeColor);

// Instead of a value, I can provide a setter and a getter function
me.retirementAge = 65;
Object.defineProperty(me, 'yearsToRetirement', {
  get() {
    return (this.age > this.retirementAge) ? 0 : this.retirementAge - this.age;
  },
  set(value) {
    this.age = this.retirementAge - value;
    return value;
  }
})
console.log(me.yearsToRetirement);

// I can create an object based on another one. The blueprint becomes the prototype.
const Human = {
  legs: 2,
  arms: 2,
  walk() { console.log('Walking'); }
}

const sam = Object.create(Human);
console.log(Human.isPrototypeOf(sam));

// I can use Object-based inheritance, creating an object prototype chain. However, instanceof won't work because the object was not created with a constructor function.

// Object.assign() allows to mix objects together, however the copy of arrays and objects are shallow. The following mixin function allows for deep copy of array and objects.
function mixin(target,...objects) {
  for (const object of objects) {   
    if(typeof object === 'object') {
      for (const key of Object.keys(object)) {
          if (typeof object[key] === 'object') {
          target[key] = Array.isArray(object[key]) ? [] : {};
          mixin(target[key],object[key]);
          } else {
          Object.assign(target,object);  
          }
      }
    }
  }
  return target;
}
// Mixin can then be used to copy add large amounts of properties to an object or create a copy function for example.

// If a function doesn't return a meaningful value, it is a good idea to return this to enable function chaining.

const mainCharacter = {
  name: 'Sam'
}

mainCharacter.friends = [
  'Alex',
  'Kass'
]

/* Using this is nested function with bind()
mainCharacter.findFriends = function() {
  this.friends.forEach(function(friend) {
    console.log(`${friend.name} is friends with ${this.name}.`);
  }).bind(this);
}

ES6 way, no nested function needed
mainCharacter.findFriends = function() {
  for (const friend of this.friends) {
    console.log(`${friend} is friends with ${this.name}.`);
  }
}

I can also use an arrow function (this remains bound to the original object) instead of a for...of
*/
mainCharacter.findFriends = function() {
  this.friends.forEach((friend) => {
    console.log(`${friend} is friends with ${this.name}.`);
  })
}


mainCharacter.findFriends();
console.log(mainCharacter)

// An object can borrow a method from another object with the help of the call function.
mainCharacter.fly = function() {
  console.log(`${this.name} can fly!`)
}

const supportCharacter = {name: 'Jones'}
const fly = mainCharacter.fly;
fly.call(supportCharacter); 

// ES6 can turn array-like object into arrays with Array.from() or the spread operator

// I was already familiar with the section Modular JS of chapter 15