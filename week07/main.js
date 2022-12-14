// Chapter 11
function square(x) {
  return x * x;
}

console.log(square.length);

function sayHello() {
  return `Hello, my name is ${this.name}`;
}
// Use call to provide a value to this
const samuel = {name: 'Samuel'}
console.log(sayHello.call(samuel));

// If the function needs parameters, they can be provided after the first value in call. 
function sayGoodbye(time="day") {
  return `Have a good ${time}, ${this.name}`
}
console.log(sayGoodbye.call(samuel, 'night'));

// If there is not this in the function, use null as the first argument.
console.log(square.call(null, 4))

// Apply works the same way but with an array of arguments 
console.log(square.apply(null, [4]))

// Properties can be added to a function the same way they can be added to an object

// I can use a cache property to reduce computation cost. This technique is called memoization
function chachedSquare(x) {
  chachedSquare.cache = chachedSquare.cache || {};
  if (!chachedSquare.cache[x]) {
    chachedSquare.cache[x] = x * x;
  }
  return chachedSquare.cache[x];
}

console.log(chachedSquare(-11));
console.log(chachedSquare(3));
console.log(chachedSquare.cache);

// Immediately Invoqued Function Express (IIFE)
(function(){
  const temp = 'world';
  console.log(`Hello ${temp}`);
})();

// IIFE are useful to declare variables that will only be needed temporarly and to avoid name collision
// ES6 allows use to just use a block instead of a IIFE by using const and let.
// IIFE can be used to "force" strict mode on code from other developer.

// Functions can redefine themselves
function party() {
  console.log('Wow this is amazing!');
  party = function() {
    console.log('Been there, got the T-shirt');
  }
}

party()
party()

// Any properties defined on the function will be erased when the function is rewritten (Lazy Definition Pattern)

// Init time branching can be use to check if the browser supports given features and rewrite the function accordingly.

function ride(){
  if (window.unicorn) { // fictionnal browser feature
      ride = function(){
      return 'Riding on a unicorn is the best!';
      }
  } else {
      ride = function(){
      return 'Riding on a pony is still pretty good';
      }
  }
  return ride();
}

console.log(ride())

// Recursion
function collatz(n, sequence=[n]) {
  if (n === 1) {
    return `Sequence took ${sequence.length} steps. It was ${sequence}.`;
  }
  if (n%2 === 0) {
    n = n/2;
  } else {
    n = 3 * n + 1;
  }

  return collatz(n, [...sequence, n]);
}

console.log(collatz(18));

// Callbacks
function wait(message, callback, seconds) {
  setTimeout(callback, seconds * 1000);
  console.log(message);
}

function selfDestruct() {
  console.log('BOOOOM!');
}

wait('This tape will self-destruct in five seconds...', selfDestruct, 5);
console.log('Should I accept the mission or not?');

// Callbacks always have to wait until the current execution stack is complete before being invoked.

const dice = {
  sides: 6,
  roll() {
    return Math.floor(this.sides * Math.random()) + 1; 
  }
}

console.log('Before the roll');

const promise = new Promise( (resolve, reject) => {
  console.log('Promise pending...')
  const n = dice.roll();
  setTimeout(() => {
    (n > 1) ? resolve(n) : reject(n);
  }, n * 1000);
})

promise.then(result => console.log(`Yes! I rolled a ${result}`))
  .catch(result => console.log(`Drat! I rolled a ${result}`));
  
console.log('After the roll');

// A closure is a function that returns another function and maintains access to any variables created in the original function's score
function outer() {
  const outside = 'Outside!';
  function inner() {
    const inside = 'Inside!';
    console.log(outside);
    console.log(inside);
  }
  return inner;
}

const closure = outer();

closure();

// Counter example using closure
function counter(start) {
  let i = start;
  return function() {
    return i++;
  }
}

const count = counter(1)

console.log(count())
console.log(count())

// Generators return a Generator object. THis object can be used to create an iterator. By calling the next() method, it returns a value. Instead of return, we use the keyword yield
function* fibonacci(a, b) {
  let [prev, current] = [a, b];
  while (true) {
    [prev, current] = [current, prev + current];
    yield current;
  }
}

const sequence = fibonacci(1, 1);
console.log(sequence.next());
console.log(sequence.next());
console.log(sequence.next());

for (n of sequence) {
  if (n > 100) {
    break;
  }
  console.log(n);
}

// Functional programming uses pure functions (takes at least one argument, return a value, non-destructive changes, no side-effects). The square function at the beginning of this file is an example of pure function.

// High-order functions take a function as an argument, return a function, or both.
function multiplier(x) {
  return function(y) {
    return x * y;
  }
}

const double = multiplier(2)

console.log(double(3))
// Neat trick using anonymous function
console.log(multiplier(3)(5))

