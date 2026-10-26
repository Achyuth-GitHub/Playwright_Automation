"use strict";
let message1 = "Rama"; //Static typing, we need to define data type 
//message1 = 2;  //invalid can't assign num to String that is stric typing
console.log(message1);
let age1 = 20;
console.log(age1);
let isActive = false;
let numbers1 = [1, 2, 3];
let data = "This could be anything"; //any data type, we can use similar like JS, dynamic 
data = 45;
function add1(a, b) {
    return a + b;
}
add1(3, 6);
let user = { name: "Bob", age: 34 };
user.location = "hyderabad";
