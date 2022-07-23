let operation = undefined;
let currentValue = ''
let previousValue = ''

const inputDisplay = document.querySelector('input');
inputDisplay.value = inputDisplay.placeholder;
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
// const dotButton =document.getElementById('dot');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const signToggleButton = document.getElementById('toggleSign')
const percentageButton = document.getElementById('percentage');
const squareButton = document.getElementById('square');
const squareRootButton = document.getElementById('squareRoot');
// (
const leftBracketButton = document.getElementById('leftBracket');
// )
const rightBracketButton = document.getElementById('rightBracket');

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

let dividedByZero = false;

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
                inputDisplay.value = 'No! you divide by zero';
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

    // if (calculation.toString().includes('.')) {
    //     calculation = parseFloat(calculation).toFixed(14)
    // }

    currentValue = calculation;
    operation = undefined;
    previousValue = ''
}

const appendNumber = (e) => {
    // if (currentValue === '.' && currentValue.includes('.')) return;
    if(e.target.textContent === '.' && currentValue == ''){
        currentValue = '0' + '.';
    }

    // if (e.target.textContent === '.' && currentValue) {
    //     if(currentValue === '.') {
    //         currentValue = '0' + '.';
    //     } else {
    //         currentValue = currentValue + '.'
    //     }
    // }


    
    if (e.target.textContent === '.' && currentValue.toString().includes('.')) {

        if (inputDisplay.value.toString().includes('.')){
            console.log('check check');
            currentValue = '0' + '.';
        } else {
            return;
        }
        
    } 
    
    
    if(toClear) {
        currentValue='';
        toClear=false;
    } 
    currentValue = currentValue.toString() + e.target.textContent.toString();
    // inputDisplay.value = parseFloat(currentValue);
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
    
   if (dividedByZero){
    dividedByZero=false
    previousValue = '';
    currentValue = '';
    return;
   }

//    if (isNaN(inputDisplay.value) || currentValue) {
//     inputDisplay.value = '';
//     previousValue = '';
//     currentValue = '';
//     operation = undefined;
  
//    }

   console.log('current vlaue: ' + currentValue);
   console.log('previous value: '+ previousValue);
   
    // inputDisplay.value = currentValue;
    // if (currentValue === 0 || currentValue === '0') inputDisplay.value = '0';

    // inputDisplay.value = currentValue? currentValue : previousValue;

   if (currentValue === '') {
        inputDisplay.value = previousValue;
   } else if (currentValue === '.'){
        inputDisplay.value = '0' + '.';
   } else {
        inputDisplay.value = currentValue;
   }

    // if (isNaN(inputDisplay.value)) {
        
    // }
    // if (currentValue == '.') {
    //     // console.log(true);
    //     currentValue = '0' + '.'
    // }

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

let decimalDot = false;
numberButtons.forEach(button => {
    button.addEventListener('click', (e)=> {
        // if (button.id === 'dot') {
        //     console.log('dot dot');
        //     decimalDot = true;
        // }
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
        // console.log(currentValue);
    }
})

rightBracketButton.addEventListener('click', ()=>{
    operate()
    updateDisplayValue()
    // previousValue = currentValue;
    toClear= true;

})