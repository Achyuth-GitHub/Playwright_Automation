//Objects- collection of properties

let person = {
    firstName : 'Deepu',
    lastName: 'Manepally',
    fullName : function()
    {
        console.log(this.firstName+this.lastName)
    }
}

console.log(person.fullName())
console.log(person['lastName'])
person.firstName = 'Achyuth'
console.log(person.firstName)
person.gender = 'male'
person.age = 34
console.log(person)

delete person.gender
console.log(person)
console.log('gender' in person)

//print all values of object
for(let key in person)
{
    console.log(person[key])
}
