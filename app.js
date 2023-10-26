const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const pointButton = document.querySelector('[data-point]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;

numberButtons.forEach(button => button.addEventListener('click', () => appendNumber(button.textContent)));
operatorButtons.forEach(button => button.addEventListener('click', () => setOperator(button.textContent)));
clearButton.addEventListener('click', () => clearDisplay());
equalsButton.addEventListener('click', () => evaluate());
deleteButton.addEventListener('click', () => deleteNumber());
pointButton.addEventListener('click', () => appendPoint());


function appendNumber(number) {
    if (currentOperandTextElement.textContent === '0') return;
    currentOperandTextElement.textContent += number;
};

function clearDisplay() {
    currentOperandTextElement.textContent = '';
    previousOperandTextElement.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
};

function setOperator(operation) {
    if (currentOperator !== null) evaluate();
    currentOperator = operation;
    firstOperand = currentOperandTextElement.textContent;
    previousOperandTextElement.textContent = `${firstOperand} ${currentOperator} `;
    currentOperandTextElement.textContent = '';
};

function deleteNumber() {
    currentOperandTextElement.textContent = currentOperandTextElement.textContent
        .toString()
        .slice(0, -1);
};

function appendPoint() {
    if (currentOperandTextElement.textContent === '') {
        currentOperandTextElement.textContent = '0';
    }
    if (currentOperandTextElement.textContent.includes('.')) return;

    currentOperandTextElement.textContent += '.';
};

function evaluate() {
    if (currentOperator === null) return;
    if (currentOperator === '/' && currentOperandTextElement.textContent === '0') {
        alert('Cannot divide by zero')
        return;
    };
    secondOperand = currentOperandTextElement.textContent;
    currentOperandTextElement.textContent = operate(currentOperator, firstOperand, secondOperand);
    previousOperandTextElement.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    currentOperator = null;
};

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    };
};