// Global scope variable
let globalVar = "I am a global variable";

function lexicalScopeDemo() {
  // Local scope variable
  let localVar = "I am a local variable";

  // Function within lexicalScopeDemo function
  function innerFunction() {
    console.log(localVar); // Accessing localVar from lexical scope
  }

  // Accessing global variable
  console.log(globalVar); // Accessible within lexicalScopeDemo function
  innerFunction(); // Calling inner function to demonstrate lexical scope
}

// Calling lexicalScopeDemo function
lexicalScopeDemo();

// Trying to access local variable outside its scope
// console.log(localVar); // Error: localVar is not defined

// Block scope example
{
  // Block-scoped variable
  let blockVar = "I am a block-scoped variable";
  console.log(blockVar); // Accessible within the block
}
// Trying to access block-scoped variable outside its block
// console.log(blockVar); // Error: blockVar is not defined

// Closure example
function outerFunction() {
  // Outer function variable
  let outerVar = "I am from outerFunction";
  // Inner function with closure
  function innerFunction() {
    console.log(outerVar); // Accessing outerVar from lexical scope
  }
  // Returning inner function
  return innerFunction;
}
// Calling outerFunction to get closure
let closure = outerFunction();
// Calling closure
closure(); // Output: 'I am from outerFunction
