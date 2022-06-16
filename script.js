const numberButtons = document.querySelectorAll(".number-button");
const periodButton = document.querySelector("#period-button");
const signButton = document.querySelector("#sign-button");
const operationButtons = document.querySelectorAll(".operation-button");
const equalsButton = document.querySelector("#equals-button");
const currentInput = document.querySelector("#current-input");
const lastInput = document.querySelector("#last-input");
const operationInput = document.querySelector("#operation-input");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");

let leftOperand = "";
let rightOperand = "";
let operationSymbol = "";

numberButtons.forEach((button) => {button.addEventListener('click', (event) => {
    leftOperand = leftOperand === "0" ? "" : leftOperand;
    rightOperand = rightOperand === "0" ? "" : rightOperand;
    if (operationSymbol === "") {
        leftOperand += event.currentTarget.value;
        currentInput.textContent = leftOperand;
    } else {
        rightOperand += event.currentTarget.value;
        currentInput.textContent = rightOperand;
    }
})});

operationButtons.forEach((button) => {button.addEventListener('click', (event) => {
    currentInput.textContent = "";
    if (leftOperand === "") {
        return;
    } else if (operationSymbol !== "" && rightOperand !== "") {
        leftOperand = evaluate(false);
        rightOperand = "";
    }
    operationSymbol = event.currentTarget.value;
    lastInput.textContent = leftOperand[leftOperand.length-1] === "." ? leftOperand+"0" : leftOperand;
    if (leftOperand !== "Error: Division by zero.") {
        operationInput.textContent = operationSymbol;
    }
})});

equalsButton.addEventListener('click', () => {
    leftOperand = evaluate();
    rightOperand = "";
    operationSymbol = "";
    currentInput.textContent = leftOperand;
    lastInput.textContent = "";
    operationInput.textContent = "";
});

clearButton.addEventListener('click', () => {
    leftOperand = "";
    rightOperand = "";
    operationSymbol = "";
    currentInput.textContent = "";
    lastInput.textContent = "";
    operationInput.textContent = "";
});

deleteButton.addEventListener('click', () => {
    if (operationSymbol === "" && rightOperand === "") {
        leftOperand = leftOperand.substring(0, leftOperand.length-1);
        currentInput.textContent = leftOperand;
    } else if (operationSymbol !== "" && rightOperand === "") {
        operationSymbol = "";
        currentInput.textContent = leftOperand;
    } else {
        rightOperand = rightOperand.substring(0, rightOperand.length-1);
        currentInput.textContent =  rightOperand;
    } 
});

periodButton.addEventListener('click', () => {
    if (leftOperand === "" && rightOperand === "") {
        leftOperand += "0.";
        currentInput.textContent = leftOperand;
    } else if (leftOperand !== "" && operationSymbol === "" && rightOperand === "") {
        if (leftOperand.indexOf(".") === -1) {
            leftOperand += ".";
            currentInput.textContent = leftOperand;
        }
    } else if (leftOperand !== "" && operationSymbol !== "" && rightOperand === "") {
        rightOperand += "0.";
        currentInput.textContent = rightOperand;
    }else {
        if (rightOperand.indexOf(".") === -1) {
            rightOperand += ".";
            currentInput.textContent = rightOperand;
        }
    }
});

signButton.addEventListener('click', () => {
    if (operationSymbol === "" && rightOperand === "") {
        if (leftOperand === "") {
            leftOperand += "-"
        } else {
            leftOperand = leftOperand[0] === "-" ? leftOperand.substring(1) : "-"+leftOperand;
        }
        currentInput.textContent = leftOperand;
    } else {
        if (rightOperand === "") {
            rightOperand += "-"
        } else {
            rightOperand = rightOperand[0] === "-" ? rightOperand.substring(1) : "-"+rightOperand;
        }
        currentInput.textContent = rightOperand;
    }
});

function evaluate() {
    let output;
    if (operationSymbol === "+") {
        output = +leftOperand + +rightOperand;
    } else if (operationSymbol === "−") {
        output = +leftOperand - +rightOperand;
    } else if (operationSymbol === "×") {
        output = +leftOperand * +rightOperand;
    } else if (operationSymbol === "÷") {
        if (rightOperand === "0") {
            output = "Error: Division by zero."
            leftOperand = "";
            rightOperand = "";
        } else {
            output = +leftOperand / +rightOperand;
        }
    }
    
    return output.toString();
}
