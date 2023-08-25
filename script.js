/*
    -Two global variables to keep track of numbers

    1. onclick number replace display with that number
        -Will append number to num1 -------------
    2. onclick '=' call the operate function and update the display with the result 
        -If either num fields aren't populated will not execute
    3. operate function will determine which function to call based on operator clicked
    4. onclick operator will 
        -Will change operator variable to respective operator
        -If both nums are populated will evaluate
        -If either nums aren't populated will simply change the operator variable to respective
    5. onclick decimal will
        -update hasDecimal bool to true
        -If true disable decimal button
        -On eval change hasDecimal to false
    6. onclick sign change button will
        -Will change sign of the appropriate num var
        -


    7. onclick changeSign button
        -
*/
const display = document.querySelector("#display");

function add(num1,num2){
    return num1 + num2;
}

function subtract(num1,num2){
    return num1 - num2;
}

function multiply(num1,num2){
    return num1 * num2;
}

function divide(num1,num2){
    if(num2 === 0){
        return "Infinity";
    } 
    else{
        return num1/num2;
    }
}

function mod(num1,num2){
    return num1 % num2;
}

function clear(){
    NUM_1 = "";
    NUM_2 = "";
    OPERATOR = "";
    display.textContent = "";
}

function updateDisplay(newNum){
    console.log(newNum);
    if(display.textContent === "Infinity" || OPERATOR != "" && NUM_2 == "" ){
        decimalButton.disabled = false;
        display.textContent = newNum;
    }
    else {
        display.textContent += newNum;
    }
    updateNumbers(display.textContent);
}

function updateNumbers(num){
    if(NUM_1 != "" && OPERATOR != ""){
        NUM_2 = num;
    }
    else if(NUM_2 == "")
    {
        NUM_1 = num;
    }
}

function operate(operator){
    OPERATOR = operator;
    if (NUM_2 == ""){
        return;
    }
    if (NUM_1 != "" && NUM_2 != "" && OPERATOR != ""){
        equals();
    }
}

function equals(){
    let num_new;
    if (NUM_1 == "" || NUM_2 == "" || OPERATOR == ""){
        return;
    }
    else if (OPERATOR == "+"){
        num_new = add(+NUM_1,+NUM_2);
    }
    else if (OPERATOR == "-"){
        num_new = subtract(+NUM_1,+NUM_2);
    }
    else if (OPERATOR == "*"){
        num_new = multiply(+NUM_1,+NUM_2);
    }
    else if (OPERATOR == "/"){
        num_new = divide(+NUM_1,+NUM_2);
    }
    else if (OPERATOR == "%"){
        num_new = mod(+NUM_1,+NUM_2);
    }
    
    NUM_1 = num_new;
    if (num_new == "Infinity"){
        NUM_1 = "";
    }
    NUM_2 = "";
    OPERATOR = "";
    display.textContent = Number(num_new.toFixed(3));
}

let NUM_1 = ""
let NUM_2 = ""
let OPERATOR = "";

const numButtons = document.querySelectorAll(".num");
numButtons.forEach(button => {
    button.addEventListener('click',(event) =>{
        updateDisplay(event.currentTarget.textContent)
    });
})

const opButtons = document.querySelectorAll('.operator');
opButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        operate(event.currentTarget.textContent);
    })
})

const equalButton = document.querySelector('#equal')
equalButton.addEventListener('click', equals);

const clearButton = document.querySelector('#AC')
clearButton.addEventListener('click', clear);

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
    decimalButton.disabled = true;
})

const signButton = document.querySelector('#changeSign');
signButton.addEventListener('click', () => {
    if (!display.textContent.includes('-')){
        display.textContent = `-${display.textContent}`
    } 
    else {
        display.textContent = display.textContent.substring(1);
    }
    updateNumbers(display.textContent);
})