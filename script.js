const display = document.getElementById('calc-display');
const buttons = document.querySelectorAll('.button');

let firstValue = null;
let operator = null;
let waitingForNext = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();

    if (!isNaN(value) || value === '.') {
      // Number or decimal
      if (waitingForNext) {
        display.value = value;
        waitingForNext = false;
      } else {
        display.value = display.value === '0' ? value : display.value + value;
      }
    } else if (['+', '−', '×', '/'].includes(value)) {
      // Operator
      firstValue = parseFloat(display.value);
      operator = value;
      waitingForNext = true;
    } else if (value === '=') {
      // Calculate
      if (operator && firstValue !== null) {
        const secondValue = parseFloat(display.value);
        let result = 0;
        switch (operator) {
          case '+': result = firstValue + secondValue; break;
          case '−': result = firstValue - secondValue; break;
          case '×': result = firstValue * secondValue; break;
          case '/': result = firstValue / secondValue; break;
        }
        display.value = result;
        firstValue = null;
        operator = null;
        waitingForNext = false;
      }
    } else if (value === 'AC') {
      display.value = '';
      firstValue = null;
      operator = null;
      waitingForNext = false;
    } else if (value === '⌫') {
      display.value = display.value.slice(0, -1);
    } else if (value === '%') {
      if (display.value !== '') {
        display.value = parseFloat(display.value) / 100;
      }
    } else if (value === '+/-') {
      if (display.value !== '') {
        display.value = parseFloat(display.value) * -1;
      }
    }
  });
});