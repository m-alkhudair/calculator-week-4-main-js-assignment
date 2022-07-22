let operation = undefined;
let currentValue = ''
let previousValue = ''

const inputDisplay = document.querySelector('input');
inputDisplay.value = inputDisplay.placeholder;
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const dotButton =document.getElementById('dot');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const signToggleButton = document.getElementById('toggleSign')
const percentageButton = document.getElementById('percentage');
const squareButton = document.getElementById('square');
const squareRootButton = document.getElementById('squareRoot');

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

const divide = (arg1, arg2) => {
    return parseFloat(arg1)/parseFloat(arg2);
};

const operate = () => {
    console.log(previousValue);
    console.log(currentValue);

    let calculation;
    const firstArg = parseFloat(previousValue);
    const secondArg = parseFloat(currentValue);
    if (isNaN(firstArg) || isNaN(secondArg)) return;
    switch (operation){
        case '+':
            calculation = add(firstArg, secondArg);
            break
        case '-':
            calculation = subtract(firstArg, secondArg);
            break
        case '*':
            calculation = multiply(firstArg, secondArg);
            break
        case '/':
            calculation = divide(firstArg, secondArg);
            break
        default:
            return
    }

    console.log(firstArg);
    console.log(secondArg);

    currentValue = calculation;
    operation = undefined;
    previousValue = ''
}

const appendNumber = (e) => {
    // if (currentValue === '.' && currentValue.includes('.')) return;
    if (e.target.textContent === '.' && currentValue.includes('.')) return;
    
    if(toClear) {
        currentValue='';
        toClear=false;
    } 
    currentValue = currentValue.toString() + e.target.textContent;
    console.log(currentValue);
}

const addOperator = (e) => {
    if (currentValue === '') return;
    if (previousValue !== '') {
        operate()
    }
    operation = e.target.value;
    console.log(operation);
    previousValue = currentValue;
    currentValue = ''
}

const updateDisplayValue = () => {
    // inputDisplay.value = currentValue;
    inputDisplay.value = currentValue? +currentValue : +previousValue;
    if (operation != null) {
        console.log(`${previousValue} ${operation}`);
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', (e)=> {
        appendNumber(e)
        updateDisplayValue()
    } )
})

operatorButtons.forEach(button=>{
    button.addEventListener('click', (e)=>{
        addOperator(e)
        updateDisplayValue()
    })
})

let toClear = false;
equalsButton.addEventListener('click', (e)=>{
    operate()
    updateDisplayValue()
    // previousValue = currentValue;
    toClear= true;
    
})

clearButton.addEventListener('click', ()=>{
    inputDisplay.value = '';
    previousValue = '';
    currentValue = '';
    operation = undefined;
})

signToggleButton.addEventListener('click', ()=>{
    currentValue = inputDisplay.value;
    if (currentValue) {
        currentValue = parseFloat(currentValue)*(-1);
        updateDisplayValue()
    
    }
})

percentageButton.addEventListener('click', ()=>{
    currentValue = inputDisplay.value;
    if (currentValue) {
        currentValue = parseFloat(currentValue)/100;
        updateDisplayValue()
    }
})

squareButton.addEventListener('click', ()=>{
    currentValue = inputDisplay.value;
    if (currentValue) {
        currentValue = parseFloat(currentValue)**2;
        updateDisplayValue()
    }
})

squareRootButton.addEventListener('click', ()=>{
    currentValue = inputDisplay.value;
    if (currentValue) {
        currentValue = parseFloat(currentValue)**(1/2);
        updateDisplayValue()
    }
})