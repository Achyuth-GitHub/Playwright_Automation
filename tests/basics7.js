//Classes
module.exports = class Person
{
    age = 25 //class variables
    get location() //getter method its consider as property
    {
        return "Canada"
    }
    //Constructor - a mthod which executes by default when u create the obj
    constructor(firstName, lastName) //instance variables/properties are defined on constructor
    {
            this.firstName = firstName
            this.lastName = lastName
    }

    //method are written in class
    fullName()
    {
        console.log(this.firstName+this.lastName)
    }
}

//Objcreation
//let person = new Person('Deepu', 'Manepally')
//let person1 = new Person('Achyuth', 'Manepally')
//console.log(person.age)
//console.log(person.location)
//console.log(person.fullName())
//console.log(person1.fullName())