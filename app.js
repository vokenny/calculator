(function () {
  'use strict';

  /* CONSTANTS */
  const INFINITY_MSG = 'We don\'t do that here';
  const OPERATORS = ['+', '-', 'x', '*', '/'];

  /* DOCUMENT SELECTORS */
  const screenCalc = document.querySelector('#screen-calc');
  const screenOperand = document.querySelector('#screen-operand');
  const clearButton = document.querySelector('#clear');
  const deleteButton = document.querySelector('#delete');
  const posNegButton = document.querySelector('#pos-neg');
  const operandButtons = document.querySelectorAll('.operand');
  const operatorButtons = document.querySelectorAll('.operator');
  const decimalButton = document.querySelector('#decimal');
  const equalButton = document.querySelector('#equal');

  /*  CALCULATOR STATE */
  let firstOperand = '';
  let operator = '';
  let currentOperand = '';
  let infinityMsgToggle = false;

  const getCurrentCalc = () => operator ? firstOperand + ' ' + operator : firstOperand;
  const hasDecimal = () => currentOperand.includes('.');

  function addDecimal() {
    // Only add decimal when there isn't already one
    if (!hasDecimal()) currentOperand += '.';
  }

  function addOperand(value) {
    if (currentOperand.length < 12) {
      // Disallow leading zeros
      if (currentOperand != '0') currentOperand += value
      else currentOperand = value;
    }
  }

  function sanitiseOperand() {
    // Remove trailing decimal
    let operand = currentOperand.substr(currentOperand.length - 1) === '.'
      ? currentOperand.slice(0, -1)
      : currentOperand;

    // Remove trailing zeros
    currentOperand = parseFloat(operand).toString();
  }

  function updateOperator(value) {
    if (currentOperand) sanitiseOperand();

    if (!firstOperand) {
      firstOperand = currentOperand;
      currentOperand = '';
    }

    // Perform calculation if both are defined
    if (firstOperand && currentOperand) operate();

    // Update operator to latest one, to continue chain of calculations
    // Unless chain has been interrupted by a division of zero
    if (!infinityMsgToggle) operator = value;
  }

  function formatOperand() {
    if (firstOperand != INFINITY_MSG) {
      // Round to 5 decimal places
      firstOperand = Math.round(firstOperand * 100000) / 100000;

      // Use exponential notation if length is > 12
      if (firstOperand.toString().length > 12) {
        firstOperand = firstOperand.toExponential(3).toString();
      }
    }
  }

  const add = (x, y) => x + y;
  const subtract = (x, y) => x - y;
  const multiply = (x, y) => x * y;
  const divide = (x, y) => {
    if (y === 0) {
      infinityMsgToggle = true;
      return INFINITY_MSG
    }

    return x / y;
  }

  function posNegMultiple() {
    if (currentOperand) currentOperand = (currentOperand * -1).toString();
  }

  function operate() {
    if (firstOperand && currentOperand) {
      let x = parseFloat(firstOperand);
      let y = parseFloat(currentOperand);

      switch (operator) {
        case '+':
          firstOperand = add(x, y);
          break;
        case '-':
          firstOperand = subtract(x, y);
          break;
        case 'x':
        case '*':
          firstOperand = multiply(x, y);
          break;
        case '÷':
        case '/':
          firstOperand = divide(x, y);
          break;
      }

      formatOperand();
      clearCalc();
    }
  }

  function updateScreen() {
    screenCalc.textContent = getCurrentCalc();
    screenOperand.textContent = currentOperand;

    if (infinityMsgToggle) {
      clearMemory();
      infinityMsgToggle = false;
    }
  }

  function clearMemory() {
    firstOperand = '';
    operator = '';
    currentOperand = '';
  }

  function clearCalc() {
    operator = '';
    currentOperand = '';
  }

  function deleteLastValue() {
    currentOperand = currentOperand.slice(0, -1);
  }

  function keyHandler(key) {
    if (!isNaN(parseInt(key))) addOperand(key);
    if (OPERATORS.includes(key)) updateOperator(key);
    if (key === '.') addDecimal();
    if (key === 'Enter' || key === '=') operate();
    if (key === 'Backspace') deleteLastValue();
  }

  function addCalcEventListeners() {
    document.addEventListener('keydown', (evt) => { keyHandler(evt.key); updateScreen(); });
    clearButton.addEventListener('click', () => { clearMemory(); updateScreen(); });
    deleteButton.addEventListener('click', () => { deleteLastValue(); updateScreen(); });
    posNegButton.addEventListener('click', () => { posNegMultiple(); updateScreen(); });
    decimalButton.addEventListener('click', () => { addDecimal(); updateScreen() });
    equalButton.addEventListener('click', () => { operate(); updateScreen(); });

    operandButtons.forEach(operand =>
      operand.addEventListener('click', (evt) => {
        addOperand(evt.target.value);
        updateScreen();
      }));

    operatorButtons.forEach(operator =>
      operator.addEventListener('click', (evt) => {
        updateOperator(evt.target.value);
        updateScreen();
      }));
  }

  addCalcEventListeners();
}())