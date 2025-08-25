const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let lastOperator = '';
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const buttonValue = button.textContent;

        if (!action) {
            // Number or decimal point input
            if (resultDisplayed) {
                currentInput = buttonValue === '.' ? '0.' : buttonValue;
                resultDisplayed = false;
            } else {
                // Prevent multiple decimals in one number
                if (buttonValue === '.' && currentInput.slice(-1) === '.') return;
                currentInput += buttonValue;
            }
            display.value = currentInput;
        } else {
            switch(action) {
                case 'clear':
                    currentInput = '';
                    display.value = '';
                    break;
                case 'backspace':
                    currentInput = currentInput.slice(0, -1);
                    display.value = currentInput;
                    break;
                case '=':
                    try {
                        // Evaluate expression safely
                        const evaluated = Function(`return ${currentInput}`)();
                        display.value = evaluated;
                        currentInput = String(evaluated);
                        resultDisplayed = true;
                    } catch {
                        display.value = 'Error';
                        currentInput = '';
                    }
                    break;
                default:
                    // Operators (+, -, *, /)
                    if (currentInput === '') {
                        // Prevent operator at start
                        return;
                    }
                    // Prevent duplicate operator
                    if ("+-*/".includes(currentInput.slice(-1))) {
                        currentInput = currentInput.slice(0, -1) + action;
                    } else {
                        currentInput += action;
                    }
                    display.value = currentInput;
            }
        }
    });
});
