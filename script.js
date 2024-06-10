const calculation = {
    firstNumber: 0,
    secondNumber: 0,
    operator: "+",
}

// Assign functionality to all buttons
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", (e) => {
        let target = e.target;
        console.log(target.id);

        if (target.classList.contains("numberKey")) {
            handleNumberKey(Number.parseInt(target.id));
        } else if (target.classList.contains("operatorKey")) {
            handleOperatorKey(target.id);
        } else {
            handleSpecialKey(target.id);
        }
    });
});

function handleNumberKey(key) {

}

function handleOperatorKey(key) {

}

function handleSpecialKey(key) {

}


function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case "+":
            add(firstNumber, secondNumber);
            break;

        case "-":
            subtract(firstNumber, secondNumber);
            break;

        case "*":
            multiply(firstNumber, secondNumber);
            break;

        case "/":
            divide(firstNumber, secondNumber);
    
        default:
            console.error("Operator not recognized");
            break;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}