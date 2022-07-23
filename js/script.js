let operation = undefined;
let currentValue = ''
let previousValue = ''

let dividedByZero = false;
let toClear = false;

const inputDisplay = document.querySelector('input');
inputDisplay.value = inputDisplay.placeholder;
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const signToggleButton = document.getElementById('toggleSign');
const percentageButton = document.getElementById('percentage');
const squareButton = document.getElementById('square');
const squareRootButton = document.getElementById('squareRoot');
const leftBracketButton = document.getElementById('leftBracket');
const rightBracketButton = document.getElementById('rightBracket');
const deleterButton = document.getElementById('del');

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
            if (secondArg === 0) {
                inputDisplay.value = 'Infinity :(';
                console.log(inputDisplay.value);
                dividedByZero=true;
                return
            }
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
    let inputNumber = e.key? e.key : e.target.textContent;

    if (inputNumber === '.' && currentValue.toString().includes('.')) return;
    if (inputNumber === '0' && currentValue.toString().includes('0')) {
        // if the zero is before the decimal
        if (!inputDisplay.value.toString().includes('.')) {
            return;
        }
    }
    if (inputDisplay.value === '0') {
        currentValue = '';
    }
     
    if(toClear) {
        currentValue='';
        toClear=false;
    } 

    if (inputDisplay.value.toString().includes('.')) {
        let currentValArray = currentValue.split('');
        if (currentValArray.indexOf('.') === 0) {
            currentValArray.unshift('0');
            const currentValArrayString = currentValArray.join('');
            console.log(currentValArrayString);   
            currentValue = currentValArrayString;
        }
    }
    currentValue = currentValue.toString() + inputNumber.toString();
    console.log(currentValue);
}

const addOperator = (e) => {
    if (currentValue === '') return;
    if (previousValue !== '') {
        operate()
    }
    operation = e.key? e.key: e.target.value;
    console.log(operation);
    previousValue = currentValue;
    currentValue = ''
}

const updateDisplayValue = () => {
    
   if (dividedByZero){
    dividedByZero=false
    previousValue = '';
    currentValue = '';
    return;
   }

   console.log('current vlaue: ' + currentValue);
   console.log('previous value: '+ previousValue);

   if (currentValue === '') {
        inputDisplay.value = previousValue;
   } else if (currentValue === '.'){
        inputDisplay.value = '0' + '.';
   } else {
        inputDisplay.value = currentValue;
   }

    if (inputDisplay.value.toString().includes('.') &&  decimalCount(inputDisplay.value) > 14) {
        inputDisplay.value = parseFloat(inputDisplay.value).toFixed(14)
    }

    if (operation != null) {
        console.log(`${previousValue} ${operation}`);
    }
}

const decimalCount = (number) =>{
    const numberString = number.toString();
    if (numberString.includes('.')) {
        return numberString.split('.')[1].length;
    }
    return 0;
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

equalsButton.addEventListener('click', (e)=>{
    operate()
    updateDisplayValue()
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
        operate()
        currentValue = parseFloat(currentValue)/100;
        updateDisplayValue()
    }
})

squareButton.addEventListener('click', ()=>{
    currentValue = inputDisplay.value;
    if (currentValue) {
        operate()
        currentValue = parseFloat(currentValue)**2;
        updateDisplayValue()
    }
})

squareRootButton.addEventListener('click', ()=>{
    currentValue = inputDisplay.value;
    if (currentValue) {
        operate()
        currentValue = parseFloat(currentValue)**(1/2);
        updateDisplayValue()
    }
})

leftBracketButton.addEventListener('click', ()=>{
    currentValue = inputDisplay.value;
    if (currentValue) {
        updateDisplayValue()
    }
})

rightBracketButton.addEventListener('click', ()=>{
    operate()
    updateDisplayValue()
    toClear= true;

})

deleterButton.addEventListener('click', ()=> {
    if (isNaN(+inputDisplay.value)) {
        inputDisplay.value = '';
        previousValue = '';
        currentValue = '';
        operation = undefined;    
    }
    currentValue = inputDisplay.value.toString().slice(0, -1);
    updateDisplayValue()
})

const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operationKeys = ['+', '-', '*', '/'];

document.addEventListener('keypress', (e)=>{
    if (numberKeys.includes(e.key)) {
        appendNumber(e)
        updateDisplayValue()

    }

    if (operationKeys.includes(e.key)) {
        addOperator(e)
        updateDisplayValue()
    }

    if (e.key === 'Enter') {
        operate()
        updateDisplayValue()
        toClear= true;
    
    }

    // using the space bar to delete, because I was not able to target the backspace key
    if (e.key === ' ') {
        if (isNaN(+inputDisplay.value)) {
            inputDisplay.value = '';
            previousValue = '';
            currentValue = '';
            operation = undefined;    
        }
        currentValue = inputDisplay.value.toString().slice(0, -1);
        updateDisplayValue()
    
    }
})