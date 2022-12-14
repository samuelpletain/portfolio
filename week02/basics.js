// This week was a lot of review. Being experienced in JS (I have a coded a few Vue.js and React.js personnal projects), I was familiar with most of the content. Here are the things I learned or found interesting to write down because I don't use them enough on my personnal projects.

// Chapter 2

// The book talks about 6 primitive data types. Looking at the onlinde docs, there is actually seven types: String, Symbol, Number, Bigint, Boolean, Null, Undefined. All non-primitive data types return a type of 'object'. 
console.log(typeof 'hello', typeof 2, typeof true, typeof [1, 2, 3], typeof {name: "Samuel"});

// Non-primitive data types can be mutated later in the program even if declared with const, but not assigned to another object.
const ninja = {name: 'Bob'};
console.log(ninja.name);
ninja.name = 'Samuel';
console.log(ninja.name);

// Chapter 3

// Array deconstruction
let [x, y] = [1, 2];
console.log(x, y);

// Deconstructing allows to skip over the use of a temporary variable
[x, y] = [y, x];
console.log(x, y);

// Shift removes a value from the beginning of the array
let numbers = [1, 2, 3];
numbers.shift();
console.log(numbers);

// Unshift adds a value to the beginning of the array
numbers.unshift(1);
console.log(numbers); 

// ES6 way to merge arrays
numbers = [...numbers, ...[4, 5]];
console.log(numbers);

// Using 0 as a second parameters on splice will add the value at the index given in the first parameter
numbers.splice(3, 0, 'hello');
console.log(numbers);
// If no third parameter given, remove X values starting at the given position.
numbers.splice(3, 1);
console.log(numbers);

// The spread operator can flatten multidimensionnal arrays
const one = [1, 2];
const two = [3, 4];
const nested = [one, two];
console.log(nested);
const flattened = [...one, ...two];
console.log(flattened);

// Creating a Set. Sets are enumerable.
const list = new Set();

// Sets only hold one occurence of the value. The following Set will only hold 3 entries.
list.add(1).add(2).add(3).add(1);
console.log(list);

// Non-primitive types are considered unique values. The following Set contains two entries.
const arrays = new Set().add([1]).add([1]);
console.log(arrays);

// Check if value is included in set
console.log(list.has(2));

// Removing a value from set
list.delete(3);
console.log(list);

// Deleting all values from set
arrays.clear();
console.log(arrays);

// Converting Set to Array ES6
const setToArray = [...list];
console.log(setToArray);

// Sets can be useful to remove duplicates from a given Array
const duplicates = [1, 2, 3, 4, 2, 3, 1, 1];
console.log(duplicates);
const nonDuplicates = [...new Set(duplicates)];
console.log(nonDuplicates);

// Weak sets are only for non-primitive data. They are good to avoid memory leaks that could occur with the use of regular Sets. No possibility to see what a weak set contains other than by using the has method.
const weak = new WeakSet();
const sam = {name: 'Sam'}
weak.add(sam, {name: 'Arielle'});
console.log(weak);
console.log(weak.has(sam));

// Maps have the equivalent of weak sets: weak maps
const weakMap = new WeakMap();
weakMap.set({user1, sam});