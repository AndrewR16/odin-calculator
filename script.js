const display = document.querySelector(".text");

const calculation = {
    firstNumber: '0',
    secondNumber: '0',
    operator: "none",
    currentNumber: "firstNumber",
    preserveValue: false
}

// Assign functionality to all buttons
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", (e) => {
        let target = e.target;

        if (target.classList.contains("numberKey")) {
            handleNumberKey(target.id);
        } else if (target.classList.contains("operatorKey")) {
            handleOperatorKey(target.id);
        } else {
            handleSpecialKey(target.id);
        }
    });
});

function handleNumberKey(key) {
    let currentValue = display.textContent;
    if (calculation.preserveValue == false || display.textContent == "0") {
        display.textContent = key;
        calculation.preserveValue = true;
    } else if (display.textContent.length < 8) {
        display.textContent += key;
    }

    calculation[calculation.currentNumber] = display.textContent;
}

function handleOperatorKey(key) {
    if (calculation.currentNumber == "firstNumber" && calculation.firstNumber != "0" && key != calculation.operator) {
        calculation.operator = key;
        calculation.currentNumber = "secondNumber";
        calculation.preserveValue = false;
    } else if (calculation.currentNumber == "secondNumber" && calculation.secondNumber != "0") {
        display.textContent = operate();
        calculation.firstNumber = display.textContent == "Error" ? "0" : display.textContent;
        calculation.operator = key;
        calculation.secondNumber = "0";
        calculation.currentNumber = "secondNumber";
        calculation.preserveValue = false;
    } else {
        calculation.operator = key;
        calculation.currentNumber = "secondNumber";
        calculation.preserveValue = false;
    }

    removeSelectedOperator();
    document.querySelector(`#${key}`).classList.add("selectedOperator");
}

function handleSpecialKey(key) {
    switch (key) {
        case "clearKey":
            display.textContent = "0";
            calculation.firstNumber = "0";
            calculation.operator = "none";
            calculation.secondNumber = "0";
            calculation.currentNumber = "firstNumber";
            calculation.preserveValue = false;
            removeSelectedOperator();
            break;

        case "equalsKey":
            display.textContent = operate();
            calculation.firstNumber = display.textContent == "Error" ? "0" : display.textContent;
            calculation.operator = "none";
            calculation.secondNumber = "0";
            calculation.currentNumber = "firstNumber";
            calculation.preserveValue = false;
            removeSelectedOperator();
            break;

        case "deleteKey":
            let value = display.textContent;
            if (value.length > 1) {
                value = value.split("");
                value.pop();
                display.textContent = value.join("");
            } else {
                display.textContent = "0";
            }

            calculation[calculation.currentNumber] = display.textContent;
            break;

        case "decimalKey":
            if (!display.textContent.includes(".") && display.textContent.length < 7) {
                display.textContent += ".";
            }
            break;

        case "signKey":
            let digits = display.textContent.split("");
            if (!digits.includes("-") && digits.length < 8) {
                digits.unshift("-");
            } else if (digits.includes("-")) {
                digits.shift();
            }
            display.textContent = digits.join("");
            calculation[calculation.currentNumber] = display.textContent;
            break;

        default:
            console.log("Key not recognized");
            break;
    }
}

function removeSelectedOperator() {
    if (document.querySelector(".selectedOperator")) {
        document.querySelector(".selectedOperator").classList.remove("selectedOperator");
    }
}

function operate() {
    if (calculation.operator == "division" && calculation.secondNumber == "0") {
        return "Error";
    }

    let value;
    switch (calculation.operator) {
        case "addition":
            value = +calculation.firstNumber + +calculation.secondNumber;
            break;

        case "subtraction":
            value = calculation.firstNumber - calculation.secondNumber;
            break;

        case "multiplication":
            value = calculation.firstNumber * calculation.secondNumber;
            break;

        case "division":
            value = calculation.firstNumber / calculation.secondNumber;
            break;

        case "none":
            value = display.textContent;
            break;

        default:
            console.error("Operator not recognized");
            break;
    }

    return restricValueLength(value);
}

function restricValueLength(value) {
    let textValue = value.toString();
    if (textValue.includes(".")) {
        let digits = textValue.split("");
        while (digits.length > 8) {
            digits.pop();
        }
        textValue = digits.join("");
    } else if (textValue.length > 8) {
        textValue = "Error";
    }

    return textValue;
}
