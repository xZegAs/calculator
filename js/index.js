document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '0';
    let prevInput = '';
    let operator = null;
    let shouldResetDisplay = false;
    let calcFinished = false;

    const updateDisplay = (value) => {
        display.textContent = value;
    }

    const clear = () => {
        currentInput = '0';
        prevInput = ''
        operator = null;
        shouldResetDisplay = false;
        calcFinished = false;
        updateDisplay(currentInput);
    }

    const appendNum = (num) => {
        if (currentInput === '0' || shouldResetDisplay || calcFinished) {
            currentInput = num;
            shouldResetDisplay = false;
            calcFinished = false;
        } else {
            currentInput += num;
        }
        updateDisplay(currentInput);
    }

    const appendDec = () => {
        if (calcFinished) {
            currentInput = '0';
            calcFinished = false;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay(currentInput);
    }

    const toggleSign = () => {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
        updateDisplay(currentInput);
    }

    const percent = () => {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }

    const chooseOperator = (newOperator) => {
        if (operator != null && !shouldResetDisplay) {
            calculate();
        }

        prevInput = currentInput;
        operator = newOperator;
        shouldResetDisplay = true;
        calcFinished = false;
    }

    const calculate = () => {
        let result;
        const prev = parseFloat(prevInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator){
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = null;
        prevInput = '';
        shouldResetDisplay = true;
        calcFinished = true;
        updateDisplay(currentInput);
    }

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => appendNum(button.textContent));
    });

    document.getElementById('decimal').addEventListener('click', appendDec);
    document.getElementById('toggle-sign').addEventListener('click', toggleSign);
    document.getElementById('percent').addEventListener('click', percent);
    document.getElementById('clear').addEventListener('click', clear);

    document.querySelectorAll('.operator').forEach(button => {
        if (button.id === 'equals') {
            button.addEventListener('click', calculate);
        } else {
            button.addEventListener('click', () => chooseOperator(button.textContent));
        }
    })

    clear();

}); 