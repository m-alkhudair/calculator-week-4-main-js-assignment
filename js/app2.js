const inputDisplay = document.querySelector('input');
// let displayValue = inputDisplay.value;
inputDisplay.value = inputDisplay.placeholder;
const allButtons = document.querySelectorAll('button');
const dotButton =document.getElementById('dot');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const operatorArray = ['+', '-', '*', '/'];
let inputValue = ''
// let secondValue = ''
let ans;

// Math operator functions
const add = (...args) => {
    let sum = 0;
    for (const argument of args) {
        sum += +argument;
    }
    return sum;
};

const subtract = (...args) => {
    const subtraction = args.reduce((prevVal, curVal) => prevVal-curVal);

    return subtraction;
};

const multiply = (...args) => {
    const multiplication = args.reduce((prevVal, curVal) => prevVal*curVal);
    return multiplication;
};

const divide = (...args) => {
    const division = args.reduce((prevVal, curVal) => prevVal/curVal);
    return division;
};

const percentage = (number) => {
    return number/100;
};

const toggleSign = (number) => {
    return number*(-1);
};

const square = (arg) => {
    return arg**2;
}

const squareRoot = (arg) => {
    return arg**(1/2);
}

const dot = () => {
    let float;

    if (!inputDisplay.value) {
        float = `${0}.`
        console.log(float);
        inputDisplay.value = float;
        return float;
    } else if (inputDisplay.value.includes('.')) {
        return inputDisplay.value;
    } else {
        float = `${inputDisplay.value}.`;
        inputDisplay.value = float;
        console.log(float);
        return float;
    }
}

let toClear = false;
let firstArg = '';
let secondArg = '';
let currentOperagtion = ''

// on the number buttons
const inputValueHandler = (e) => {
    if (toClear) {
        // if (toOperate) {
        //     inputDisplay.value += e.target.textContent;
        //     secondArg = inputDisplay.value ;
        //     console.log('second val: '+secondArg);
        //     toClear=true;
        //     return;
        // }
        inputDisplay.value = null;
        inputDisplay.value += e.target.textContent;
        secondArg = inputDisplay.value ;
        console.log('second val: '+secondArg);
        toClear = false;
        return;
    }
    inputDisplay.value += e.target.textContent;
    firstArg = inputDisplay.value;
    console.log('first val: '+firstArg);
}

let toOperate = false;
// on the operator buttons
const addOperator = (e) => {
    console.log(e.target.id);
    toClear = true;

    firstArg = inputDisplay.value;

    if(firstArg && secondArg) {
        console.log('form addoperator first arg '+firstArg);
        console.log('from addoperator second arg '+secondArg);
        toOperate = !toOperate;
        if(toOperate) {
            operate()
            
            // firstArg = inputDisplay.value;
            firstArg = ans;
            if (e.target.classList == 'number') {
                secondArg += e.target.value;
                console.log(secondArg);
            }

            // secondArg += e.target.textContent;
            console.log('form addoperator first arg '+firstArg);
            console.log('from addoperator second arg '+secondArg);
            // return;
    
        }
    }
    currentOperagtion = e.target.id;
    return e.target.id;
}

const operate = () => {
    switch (currentOperagtion) {
        case 'add':     
            add(firstArg, secondArg)
            console.log(add(firstArg, secondArg));
            ans = add(firstArg, secondArg);
            inputDisplay.value = add(firstArg, secondArg);
            break;
        case 'subtract':
            subtract(firstArg, secondArg);
            console.log(firstArg+ ' minus' +secondArg);
            console.log(subtract(firstArg, secondArg));
            ans = subtract(firstArg, secondArg);
            inputDisplay.value = subtract(firstArg, secondArg);
            break;
        case 'multiply':
            multiply(firstArg, secondArg);
            console.log(multiply(firstArg, secondArg));
            ans = multiply(firstArg, secondArg);
            inputDisplay.value = multiply(firstArg, secondArg);
            break;
        case 'divide':
            divide(firstArg, secondArg);
            console.log(divide(firstArg, secondArg));
            ans = divide(firstArg, secondArg);
            inputDisplay.value = divide(firstArg, secondArg);
            break;
    }

}

for (const numberButton of allButtons) {
    if (numberButton.classList == 'number') {
        numberButton.addEventListener('click', inputValueHandler)
    }
}
// we want to make it operate and then assign it as firstArg

for (const operatorButton of allButtons) {
    if (operatorButton.classList == 'operator') {
        operatorButton.addEventListener('click', addOperator)

    }
}

equalsButton.addEventListener('click', operate);
clearButton.addEventListener('click', () => {inputDisplay.value = null, toClear=false})
