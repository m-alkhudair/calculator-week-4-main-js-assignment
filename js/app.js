const inputDisplay = document.querySelector('input');
inputDisplay.value = inputDisplay.placeholder;
const allButtons = document.querySelectorAll('button');
const dotButton =document.getElementById('dot');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
let storedAns = '';
const operatorArray = ['+', '-', '*', '/'];


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

let toClear;

const operate = () => {

    if (inputDisplay.value.includes('+')) {
        args = inputDisplay.value.split('+');
        console.log(add(...args));
        inputDisplay.value = add(...args);
    } else if (inputDisplay.value.includes('-')) {
        args = inputDisplay.value.split('-');
        console.log(subtract(...args));
        inputDisplay.value = subtract(...args);
    } else if (inputDisplay.value.includes('*')) {
        args = inputDisplay.value.split('*');
        console.log(multiplay(...args));
        inputDisplay.value = multiplay(...args);
    }

    storedAns = inputDisplay.value;
    console.log('this is stored ans '+ storedAns);
    toClear = true;
}

const updateDisplayValue = () => {

    if (inputDisplay.value.includes('+')) {
        valuesArray = inputDisplay.value.split('+');
        if (valuesArray.length>2) {

            operate();
            // toClear = false;
            console.log(valuesArray)

        } 
    
    } else if (inputDisplay.value.includes('-')) {
        valuesArray = inputDisplay.value.split('-');
        if (valuesArray.length>2) {
            operate();
            // toClear = false;
            console.log(valuesArray)

        } 
    
    } else if (inputDisplay.value.includes('*')) {
        valuesArray = inputDisplay.value.split('*');
        if (valuesArray.length>2) {
            console.log('befor operate' + '*')
            if (inputDisplay.value[inputDisplay.value.length-1]==='*')  {
                inputDisplay.value = inputDisplay.value.substring(0, inputDisplay.value.length-1);
                console.log('testing');
                console.log(inputDisplay.value);
            }    
            operate();
            // toClear = false;
            console.log(valuesArray)
        } 
    
    }
}



const inputToCalculator = (e) => {
    if (e.target.value === '*') {
        inputDisplay.value += '*';
    } else if (e.target.value === '/') {
        inputDisplay.value += '/';
    } else {
        inputDisplay.value += e.target.textContent;
    }

    console.log(inputDisplay.value);
    updateDisplayValue();
    return inputDisplay.value;
};

for (const button of allButtons) {
    if (+button.textContent || button.textContent == 0) {
        button.addEventListener('click', inputToCalculator);
        button.addEventListener('click', (e)=>{
            if (toClear) {
                if (e.target.classList == 'number') {
                    for (const operator of operatorArray) {
                        if (inputDisplay.value.includes(operator)) {
                            return;
                        }
                    }
                    inputDisplay.value = e.target.textContent;
                    toClear = false;    
                } else {
                    inputDisplay.value = storedAns;
                }
            }        
        });

    }
};

for (const operatorButton of allButtons) {
    if (operatorButton.classList == 'operator') {
        operatorButton.addEventListener('click', inputToCalculator);
    }
}

dotButton.addEventListener('click', dot);

clearButton.addEventListener('click', () => {
    inputDisplay.value = null;
    storedAns = null;
});

equalsButton.addEventListener('click', operate)

console.log(inputDisplay.value);
console.log(inputDisplay);
