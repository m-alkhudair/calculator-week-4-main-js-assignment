const inputDisplay = document.querySelector('input');
const allButtons = document.querySelectorAll('button');

// Math operator functions
const add = (...args) => {
    let sum = 0;
    for (const argument of args) {
        sum += argument;
    }
    return sum;
};

const subtract = (...args) => {
    const subtraction = args.reduce((prevVal, curVal) => prevVal-curVal);

    return subtraction;
};

const multiplay = (...args) => {
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

console.log(square(9));

const squareRoot = (arg) => {
    return arg**(1/2);
}

const operate = (operator, num1, num2) => {
    return operator(num1, num2);
}

// inputDisplay.placeholder = 'testing';
inputDisplay.value = inputDisplay.placeholder;

// console.log(inputDisplay.value);

const inputToCalculator = (e) => {
    console.log(e.target.textContent);
    // let display;
    // display += e.target.textContent; 

    // for (const item of display) {
    //     switch (item) {
    //         case item ==
    //     }
    // }
    // inputDisplay.placeholder += e.target.textContent;
};

for (const button of allButtons) {
    button.addEventListener('click', inputToCalculator);
};

console.log(inputDisplay);

console.log(operate(add, 1, 3));
console.log(operate(subtract, 1, 3));
console.log(operate(multiplay, 4, 3));
console.log(operate(divide, 1, 3));



