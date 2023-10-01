class Calculator {
    constructor(previousValueTextElement, currentValueTextElement) {
        this.previousValueTextElement = previousValueTextElement;
        this.currentValueTextElement = currentValueTextElement;
        this.clear();
    }

    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;

    }

    appendNumber(numberValue) {
        if (numberValue === '.' && this.currentValue.includes('.')) return 
        this.currentValue = this.currentValue.toString() + numberValue.toString();
    }

    updateDisplay() {
        this.previousValueTextElement.innerText = this.previousValue;
        this.currentValueTextElement.innerText = this.currentValue;
    }

    chooseOperation(operation) {
        if (this.currentValue === '') return
        if (this.previousValue !== ''){ this.calculate() }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    calculate() {
        let finalAnswer = 0;
        const currentValue = parseFloat(this.currentValue);
        const previousValue = parseFloat(this.previousValue);
        if (isNaN(currentValue) || isNaN(previousValue)) return
        switch (this.operation) {
            case '+':
                finalAnswer = previousValue + currentValue;
                break
            case '-':
                finalAnswer = previousValue - currentValue;
                break
            case 'x':
                finalAnswer = previousValue * currentValue;
                break
            case '/':
                finalAnswer = previousValue / currentValue;
                break
            default:
                return
        }
        this.currentValue = finalAnswer;
        this.previousValue = '';
        this.operation = undefined;

    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }
}

let numberButtons = document.querySelectorAll('[data-number]');
let previousValueTextElement = document.querySelector('[data-previous-value]');
let currentValueTextElement = document.querySelector('[data-current-value]');
let deleteButton = document.querySelector('[data-delete]');
let allClear = document.querySelector('[data-all-clear]');
let allOperations = document.querySelectorAll('[data-operation]');
let equalsButton = document.querySelector('[data-equals]');

let calculator = new Calculator(previousValueTextElement, currentValueTextElement);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        buttonValue = button.innerText;
        calculator.appendNumber(buttonValue);
        calculator.updateDisplay();
    })
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

allClear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

allOperations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})