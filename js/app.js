// Math operator functions
const add = (...args) => {
    let sum = 0;
    for (const argument of args) {
        sum += argument;
    }
    return sum;
};

console.log(add(1,3,5));

const subtract = (...args) => {
    const subtraction = args.reduce((prevVal, curVal) => prevVal-curVal);

    return subtraction;
};

console.log(subtract(7,6,1,1));

const multiplay = (...args) => {
    const multiplication = args.reduce((prevVal, curVal) => prevVal*curVal);
    return multiplication;
};

console.log(multiplay(7,6,1,1,3));

const divide = (...args) => {
    const division = args.reduce((prevVal, curVal) => prevVal/curVal);
    return division;
};

console.log(divide(4,2));

const percentage = (number) => {
    return number/100;
};

console.log(percentage(4));

const toggleSign = (number) => {
    return number*(-1);
};

console.log(toggleSign(-4));

const operate = (operator, num1, num2) => {
    return operator(num1, num2);
}

console.log(operate(add, 1, 3));
console.log(operate(subtract, 1, 3));
console.log(operate(multiplay, 4, 3));
console.log(operate(divide, 1, 3));



