const displayInput = document.getElementById('result');
let firstOperand = '';
let operator = '';
let secondOperand = '';
let memory = 0;

function updateDisplay(value) {
  displayInput.value = value;
}

function clearDisplay() {
  displayInput.value = '';
}

function clearAll() {
  clearDisplay();
  firstOperand = '';
  secondOperand = '';
  operator = '';
}

function appendToCurrentOperand(value) {
  if (operator === '') {
    firstOperand += value;
    updateDisplay(firstOperand);
  } else {
    secondOperand += value;
    updateDisplay(secondOperand);
  }
}

function getNumberFromKeyCode(keyCode) {
  if (keyCode >= 48 && keyCode <= 57) {
    // Number keys 0-9
    return keyCode - 48;
  } else if (keyCode >= 96 && keyCode <= 105) {
    // Numpad keys 0-9
    return keyCode - 96;
  }
  return null;
}

document.addEventListener('keydown', function(event) {
  const number = getNumberFromKeyCode(event.keyCode);
  if (number !== null) {
    appendToCurrentOperand(number.toString());
  } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
    if (firstOperand !== '') {
      operator = event.key;
      clearDisplay();
    }
  } else if (event.key === 'Enter' || event.key === '=') {
    if (firstOperand !== '' && operator !== '' && secondOperand !== '') {
      calculateResult();
    }
  } else if (event.key === '.') {
    appendToCurrentOperand('.');
  } else if (event.key === 'Backspace') {
    handleBackspace();
  } else {
    alert("Only numbers and operators allowed!");
  }
});

function handleBackspace() {
  if (operator === '') {
    firstOperand = firstOperand.slice(0, -1);
    updateDisplay(firstOperand);
  } else {
    secondOperand = secondOperand.slice(0, -1);
    updateDisplay(secondOperand);
  }
}

function createButton(text, clickHandler, id) {
  const button = document.createElement('button');
  button.textContent = text;
  button.id = id;
  button.classList.add('btn', 'btn-secondary', 'm-1');
  button.addEventListener('click', clickHandler);
  return button;
}

function createNumberButton(number) {
  return createButton(number, () => appendToCurrentOperand(number.toString()), number.toString());
}

function createOperatorButton(op) {
  const idMap = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '=': 'equal',
    '.': 'dot'
  };
  return createButton(op, () => {
    if (op === '=') {
      if (firstOperand !== '' && operator !== '' && secondOperand !== '') {
        calculateResult();
      }
    } else if (op === '.') {
      appendToCurrentOperand('.');
    } else {
      if (firstOperand !== '') {
        operator = op;
        clearDisplay();
      }
    }
  }, idMap[op]);
}

function addButtons() {
  const buttonContainer = document.querySelector('.button-container');
  for (let i = 9; i >= 1; i--) {
    buttonContainer.appendChild(createNumberButton(i));
  }
  buttonContainer.appendChild(createButton('C', clearAll, 'clear'));
  buttonContainer.appendChild(createNumberButton(0));
  buttonContainer.appendChild(createOperatorButton('.'));
  buttonContainer.appendChild(createOperatorButton('+'));
  buttonContainer.appendChild(createOperatorButton('-'));
  buttonContainer.appendChild(createOperatorButton('*'));
  buttonContainer.appendChild(createOperatorButton('/'));
  buttonContainer.appendChild(createOperatorButton('='));
}

function calculateResult() {
  secondOperand = displayInput.value;
  if (firstOperand === '' || secondOperand === '' || operator === '') {
    return;
  }

  const firstNum = parseFloat(firstOperand);
  const secondNum = parseFloat(secondOperand);
  let result;
  switch (operator) {
    case '+':
      result = firstNum + secondNum;
      break;
    case '-':
      result = firstNum - secondNum;
      break;
    case '*':
      result = firstNum * secondNum;
      break;
    case '/':
      if (secondNum === 0) {
        alert("Division by zero!");
        return;
      }
      result = firstNum / secondNum;
      break;
    default:
      return;
  }
  firstOperand = result.toString();
  secondOperand = '';
  operator = '';
  updateDisplay(firstOperand);
}

addButtons();
