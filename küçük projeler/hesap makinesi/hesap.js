const display = document.querySelector(".ab");
const keys = document.querySelector(".b");

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener("click", function (e) {
    const element = e.target;

    if (!element.matches("button"))
        return;

    if (element.classList.contains('operator')) {
        // console.log('operator', element.value);
        hendleOperator(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains('sil')) {
        sil();
        updateDisplay();
        return;
    }

    if (element.classList.contains('decimal')) {
        inputDecimal();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
});

function hendleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    }
    else
        if (operator) {
            const result = calculate(firstValue, value, operator);

            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }

    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
    if (operator == "+") {
        return first + second;
    }
    else
        if (operator == "-") {
            return first - second;
        }
        else
            if (operator == "/") {
                return first / second;
            }
            else
                if (operator == "*") {
                    return first * second;
                }

    return second;
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    }
    else {
        displayValue = displayValue === "0" ? num : displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function sil() {
    displayValue = '0';
}
