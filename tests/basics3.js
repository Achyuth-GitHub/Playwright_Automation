//Arrays
var marks = Array(6)
 marks = new Array(50,40,45,42,47,65)             //new is memory allocation operator



var marks = [50,40,45,42,47,65]    //diff ways of delcaring array

//to break array, main arr to sub arr
submarks = marks.slice(3,7)
console.log(submarks)

console.log(marks[2]) //array index starts from 0, so it will print 3rd elem of array
marks[3] = 52        //re-assigning value to 4th elem
console.log(marks)
console.log(marks.length) //to know length

marks.push(88) //to append a value at last w euse push
console.log(marks)

marks.pop()    //removes last elem from array
console.log(marks)

marks.unshift(66) //insert value at begining
console.log(marks)

console.log(marks.indexOf(45)) //to know the index of elem

//to check if elem is presnt in array or not
console.log(marks.includes(97))
console.log(marks.includes(66))

//print elem in array
for(i =0; i<marks.length;i++)
{
    console.log(marks[i])
}

//sum all elem in array
var sum =0
for(i =0; i<marks.length;i++)
{
    sum = sum + marks[i]
}
console.log(sum)


//reduce filter map
//now same in reduce method, it will iterate thru array
let total = marks.reduce((sum, mark)=> sum+mark,0)
console.log(total)

var scores = [12,13,14,16]
//print only even nums from array and put them in a new array
var evenScores = []
for(i=0; i< scores.length; i++)
{
    if(scores[i]%2 == 0)
    {
        evenScores.push(scores[i])
    }
}
console.log(evenScores)

//now same in filter method
let newFilterEvenScores = scores.filter(score=>score%2 == 0)
console.log(newFilterEvenScores)

//map method, will modify each value of array to new value
//find even nums from array and mulitply each value with 3 and sum then and put it in a new array
var newArray = newFilterEvenScores.map(score=> score*3)
console.log(newArray)
var outcome = newArray.reduce((sum, val)=> sum+val,0)
console.log(outcome)


var arr = [12,13,14,16]
var single = arr.filter(even => even%2 == 0).map(val => val*3).reduce((sum, value)=> sum+value,0)
console.log(single)


//Sorting an Array both strings and numbers

var fruits = ["Banana","mango","pomegranate","Apple"]
fruits.sort() // only for Strings
console.log(fruits)
console.log(fruits.reverse()) //decending order

var srt = [19,21,1,5,26,8]
var afterSort = srt.sort((a,b)=> a-b) //bubble sort diff btw 2 numbers and push to begining
console.log(afterSort)
console.log(srt.sort((a,b)=> b-a)) //decending order

