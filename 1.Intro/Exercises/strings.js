// --------------------------------------
// Exercise 3 - Add numbers from string to float

var numberOne = "1.10";
var numberTwo = "2.30";

// add those two numbers and show the result
// you cannot touch line 1 neither line 2


console.log(parseFloat(numberOne)+parseFloat(numberTwo));

// --------------------------------------
// Exercise 4 - Add the numbers and the total with 2 decimals

var numberOne = "1.10";
var numberTwo = "2.30";

var newNumber = parseFloat(numberOne) + parseFloat(numberTwo);

console.log(newNumber.toFixed(2));

// --------------------------------------
// Exercise 5 - Decimals and average

var one = 10;
var two = 45;
var three = 98;

// Show in the console the avg. with 5 decimals

var avg = (one+two+three)/3;

console.log(avg.toFixed(5));

// --------------------------------------

// --------------------------------------
// Exercise 6 - Get the character by index

var letters = "abc"
// Get me the character "c"

var newLetter = letters.charAt("2");
console.log(newLetter);


// --------------------------------------
// Exercise 7 - Replace

var fact = "You are learning javascript!";

// capitalize the J in Javascript


var newFact = fact.replace("j", "J");

console.log(newFact);



// --------------------------------------
