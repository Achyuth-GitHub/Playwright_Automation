import { expect, type Locator, type Page } from '@playwright/test';


let message1 : String = "Rama"; //Static typing, we need to define data type 
//message1 = 2;  //invalid can't assign num to String that is stric typing
console.log(message1);
let age1: number = 20;
console.log(age1);

let isActive: boolean = false;

let numbers1: number[] = [1,2,3];

let data: any = "This could be anything"; //any data type, we can use similar like JS, dynamic 

data = 45;

function add1(a: number,b: number): number
{
    return a+b;
}
add1(3,6)

let user:{name: String, age: number} = {name: "Bob", age: 34}
//user.location = "hyderabad"; //this can be compiled and shown as error but, runs the js file

class CartPage
{   
    page: Page;
    cartProfducts: Locator;
    constructor(page: any)
    {
        this.page = page;
        this.cartProfducts = page.locator("");
    }
}


/* STRONG TYPING */