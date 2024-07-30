// Elements
const currentInput = document.querySelector(".current-input");
const answerScreen = document.querySelector(".answer-screen");

const buttons = document.querySelectorAll("button");
const deleteButton = document.querySelector("#delete");
const clearButton = document.querySelector("#clear");
const equalityButton = document.querySelector("#equality");

// To hold the values and operators
let screenValues = [];

// Helper function to update screens
function updateScreens() {
    const displayContent = screenValues.length > 0 ? screenValues.join("") : "0";
    currentInput.innerHTML = displayContent;

    if (screenValues.length > 0) {
        try {
            const result = calculate(screenValues.join(""));
            answerScreen.innerHTML = result !== undefined ? result : "0";
        } catch {
            answerScreen.innerHTML = "0";
        }
    } else {
        answerScreen.innerHTML = "0";
    }
}

// Basic calculation function
function calculate(expression) {
    try {
        return new Function('return ' + expression)();
    } catch {
        return undefined;
    }
}

// Clear the calculator
clearButton.addEventListener("click", () => {
    screenValues = [];
    updateScreens();
});

// Handling button clicks
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.value;

        if (btn.id === "delete") {
            screenValues.pop();
            updateScreens();
        } else if (btn.id === "equality") {
            try {
                const result = calculate(screenValues.join(""));
                screenValues = [result];
                updateScreens();
            } catch {
                screenValues = [];
                updateScreens();
            }
        } else {
            screenValues.push(value);
            updateScreens();
        }
    });
});
