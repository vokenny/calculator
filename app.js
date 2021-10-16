(function () {
  'use strict';

  const INFINITY_MSG = 'We don\'t do that here';

  /* DOCUMENT SELECTORS */
  const screenCalc = document.querySelector('#screen-calc');
  const screenOperand = document.querySelector('#screen-operand');
  const clearButton = document.querySelector('#clear');
  const deleteButton = document.querySelector('#delete');
  const operandButtons = document.querySelectorAll('.operand');
  const operatorButtons = document.querySelectorAll('.operator');
  const decimalButton = document.querySelector('#decimal');
  const equalButton = document.querySelector('#equal');

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

  function addOperand(evt) {
    const value = evt.target.value;

    // Disallow leading zeros
    if (currentOperand != '0' && currentOperand.length < 15) {
      currentOperand += value
    } else currentOperand = value;
  }

  function sanitiseOperand() {
    // Remove trailing decimal
    let operand = currentOperand.substr(currentOperand.length - 1) === '.'
      ? currentOperand.slice(0, -1)
      : currentOperand;

    // Remove trailing zeros
    currentOperand = parseFloat(operand).toString();
  }

  function updateOperator(evt) {
    sanitiseOperand();

    if (!firstOperand) firstOperand = currentOperand;

    currentOperand = '';
    operator = evt.target.value;
  }

  function operate() {
    if (firstOperand && currentOperand) {
      switch (operator) {
        case '+':
          firstOperand = parseFloat(firstOperand) + parseFloat(currentOperand);
          break;
        case '-':
          firstOperand = parseFloat(firstOperand) - parseFloat(currentOperand);
          break;
        case 'x':
          firstOperand = parseFloat(firstOperand) * parseFloat(currentOperand);
          break;
        case '÷':
          currentOperand === '0'
            ? handleInfinity()
            : firstOperand = parseFloat(firstOperand) / parseFloat(currentOperand);
          break;
      }

      clearCalc();
    }
  }

  function handleInfinity() {
    infinityMsgToggle = true;
    firstOperand = INFINITY_MSG;
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

  function addCalcEventListeners() {
    clearButton.addEventListener('click', () => { clearMemory(); updateScreen(); });
    deleteButton.addEventListener('click', () => { deleteLastValue(); updateScreen(); });
    decimalButton.addEventListener('click', () => { addDecimal(); updateScreen() });
    equalButton.addEventListener('click', () => { operate(); updateScreen(); });

    operandButtons.forEach(operand =>
      operand.addEventListener('click', (evt) => {
        addOperand(evt);
        updateScreen();
      }));

    operatorButtons.forEach(operator =>
      operator.addEventListener('click', (evt) => {
        updateOperator(evt);
        updateScreen();
      }));
  }

  addCalcEventListeners();
}())