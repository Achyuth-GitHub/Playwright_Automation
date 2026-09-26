//Strings
const Person = require('./basics7')

let day = 'tuesday ' //sing or double quotes allowed
console.log(day.length)  //length
console.log(day.slice(0,4)) //substring

//to access any character
console.log(day[1])

//split string tue day
let splitDay = day.split("s")
console.log(splitDay)
console.log(splitDay[1])

//remove last char use trim
day.trim()
console.log(day)

//string to Int conversion
let date = '23'
let nextDate = '27'
let diff = parseInt(nextDate) - parseInt(date)
console.log(diff)

//Int to Sting conversion
diff.toString()

//String concatenation
let newQuote = day+ "is Funday"
console.log(newQuote)

let val = newQuote.indexOf("day",5)
console.log(val)

//how many times string day occured
let count = 0
let occ = newQuote.indexOf("day",5)
while(occ !== -1)
{
    count++
    val = newQuote.indexOf("day",5)

}
console.log(count)

let person = new person("Srivani", "Manepally")
console.log(person.age)