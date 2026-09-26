//Functions - block of code

//create fucntion to add 2 nums
function add(a,b)
{
    return a+b
}

let sum = add(2,3)
console.log(sum)

//Anonymus functions - do not have name - function expressions
let sub = function(c,d)        //Anonymus fns can only be assigned to varaibales
{
    return c-d
}
console.log(sub(41,6))

let mul = (e,f) => e*f
console.log(mul(9,4))

//var keyword - global/function let keyworkd after ES6 engine
//*****work on var, let and const*****
