//Loops


const flag = true

if(!flag)
{
    console.log("condition satisfiled")
}

else
{
    console.log(flag)
    console.log("condition not satisfiled") 
}
//based on some cond evaluation we use while
let i =0
while(i>10)
{
    i++
    console.log(i)
}

do
{
    i++
}while(i>10);
    console.log(i)

for(let k=10; k<=10; k++)
    {
        console.log(k)
    }    

//from 1 to 10 give common multiples of 2 and 5    
console.log("*****************")
let n =0
for(let j=1; j<=100; j++)
{
    if(j%2 == 0 && j%5 == 0) // == is comparision operator and = is assignment operator
    //if(j%2 == 0 || j%5 == 0)                          //  && is AND operator and || is OR operator  
    n++
    console.log(j)
    if(n == 3)
        break
}