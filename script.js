// Console demo buttons
const errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

// Console API demos
errorBtns[0].addEventListener('click', () => console.log("This is a console.log demo."));
errorBtns[1].addEventListener('click', () => console.error("This is a console.error demo."));
errorBtns[2].addEventListener('click', () => console.count("Console Count"));
errorBtns[3].addEventListener('click', () => console.warn("This is a console.warn message."));
errorBtns[4].addEventListener('click', () => console.assert(false, "This is a failed assertion."));
errorBtns[5].addEventListener('click', () => console.clear());
errorBtns[6].addEventListener('click', () => console.dir(document.body));
errorBtns[7].addEventListener('click', () => console.dirxml(document.body));

errorBtns[8].addEventListener('click', () => {
  console.group("Grouped Messages");
  console.log("This is inside the group.");
});
errorBtns[9].addEventListener('click', () => {
  console.groupEnd();
  console.log("Exited group.");
});

errorBtns[10].addEventListener('click', () => {
  const sampleData = [
    { name: "Aditya", age: 25 },
    { name: "Rita", age: 30 },
  ];
  console.table(sampleData);
});

errorBtns[11].addEventListener('click', () => console.time("Timer"));
errorBtns[12].addEventListener('click', () => console.timeEnd("Timer"));

errorBtns[13].addEventListener('click', () => {
  function first() { second(); }
  function second() { third(); }
  function third() { console.trace("Trace Example"); }
  first();
});

// Global error handler with simulated "logging"
window.onerror = function (message, source, lineno, colno, error) {
  console.log("Caught a global error:");
  console.log("Message:", message);
  console.log("Source:", source);
  console.log("Line:", lineno, "Column:", colno);
  console.log("Error object:", error);

  const errorReport = {
    message,
    source,
    lineno,
    colno,
    stack: error?.stack || "No stack trace available"
  };

  // Simulate sending the error report to a server
  console.log("Simulated sending error report to server:", errorReport);

  return true;
};

// Trigger a global error
errorBtns[14].addEventListener('click', () => {
  undefinedFunctionCall(); // This will trigger window.onerror
});

// Custom Error Class
class CustomInputError extends Error {
  constructor(message, inputType) {
    super(message);
    this.name = "CustomInputError";
    this.inputType = inputType;
    this.timestamp = new Date();
  }
}

// Input validation using throw
function validateInputs(firstNum, secondNum, operator) {
  if (!firstNum.trim()) throw new CustomInputError("First number is required.", "first-num");
  if (!secondNum.trim()) throw new CustomInputError("Second number is required.", "second-num");
  if (operator === "/" && parseFloat(secondNum) === 0) {
    throw new CustomInputError("Division by zero is not allowed.", "second-num");
  }
}

// Form handling with try/catch/finally
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const output = document.querySelector('output');
  const firstNum = document.querySelector('#first-num').value;
  const secondNum = document.querySelector('#second-num').value;
  const operator = document.querySelector('#operator').value;

  try {
    if (!output) {
      throw new Error("Output element is missing from DOM.");
    }

    validateInputs(firstNum, secondNum, operator);
    const result = eval(`${firstNum} ${operator} ${secondNum}`);
    output.innerHTML = result;
  } catch (err) {
    if (err instanceof CustomInputError) {
      console.error(`Custom Error [${err.inputType}]: ${err.message}`, err);
      output.innerHTML = "Custom input error!";
    } else {
      console.error("An error occurred during calculation:", err);
      if (output) output.innerHTML = "Error!";
    }
  } finally {
    console.log("Calculation attempt completed.");
  }
});
