const screen = document.querySelector(".screen");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const decimalButton = document.querySelector(".point");
const operatorButtons = Array.from(document.querySelectorAll(".operator"));
const numbersButtons = Array.from(document.querySelectorAll(".number"));

let operation = "";
let lastNumber = null;
let newNumber = false;


function clearScreen() {
    screen.innerHTML = "";
}

function clearCalculation() {
    operation = "";
    clearScreen();
}

function displayNum() {
    if (newNumber) {
        clearScreen();
        newNumber = false
    }
    screen.innerHTML += this.dataset.number;
}

function addOperation() {
    if (screen.innerHTML) {
        if (checkOperation()) {
            operation += screen.innerHTML;
            operation += this.dataset.operator;
            newNumber = true;
        } else
            changeOperation.call(this);
    }

}

function checkOperation() {
    let operator = operation.split("").pop();
    return (operation.indexOf(operator) === operation.length - 1);
}

function changeOperation() {
    operation = removeLastOperator() + this.dataset.operator;
}

function addDecimal() {
    if (screen.innerHTML.indexOf(".") === -1)
        screen.innerHTML += ".";
}

function evaluateOperation() {

    if (screen.innerHTML)
        operation += screen.innerHTML;
    else
        removeLastOperator();

    screen.innerHTML = eval(operation) || 0;
    operation = "";
    newNumber = true;
}

function removeLastOperator() {
    let operationArray = operation.split("")
    operationArray.pop();
    return operationArray.join("");
}

function addEventListeners() {
    clearButton.addEventListener("click", clearScreen);
    decimalButton.addEventListener("click", addDecimal);
    equalButton.addEventListener("click", evaluateOperation);
    numbersButtons.forEach(button => {
        button.addEventListener("click", displayNum);
    });
    operatorButtons.forEach(button => {
        button.addEventListener("click", addOperation);
    });
}

window.addEventListener("load", addEventListeners);
