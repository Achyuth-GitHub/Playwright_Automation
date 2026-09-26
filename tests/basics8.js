//Inheritence

const Person = require("./basics7");

class Pet extends Person
{
    get location()
    {
        return "Bluecross"
    }
    
    constructor(firstName, lastName)
    {
        //call parent class constructor mandatory
        super(firstName, lastName)  //this call parent class contructor
    }
}

let pet = new Pet("Sam","San")
console.log(pet.fullName())
console.log(pet.location)