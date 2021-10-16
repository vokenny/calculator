(function () {
  'use strict';

  /* DOCUMENT SELECTORS */
  const screenCalc = document.querySelector('#screen-calc');
  const screenOperand = document.querySelector('#screen-operand');
  const clearButton = document.querySelector('#clear');
  const deleteButton = document.querySelector('#delete');
  const operandButtons = document.querySelectorAll('.operand');
  const operatorButtons = document.querySelectorAll('.operator');
  const equalButton = document.querySelector('#equal');

  let firstOperand = '';
  let operator = '';
  let currentOperand = '';

  const getCurrentCalc = () => operator ? firstOperand + ' ' + operator : firstOperand;

  function addOperand(evt) {
    if (currentOperand.length < 15) currentOperand += evt.target.value;
  }

  function addOperator(evt) {
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
          firstOperand = parseFloat(firstOperand) / parseFloat(currentOperand);
          break;
      }

      clearCalc();
    }
  }

  function updateScreen() {
    screenCalc.textContent = getCurrentCalc();
    screenOperand.textContent = currentOperand;
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
    equalButton.addEventListener('click', () => { operate(); updateScreen(); });

    operandButtons.forEach(operand =>
      operand.addEventListener('click', (evt) => {
        addOperand(evt);
        updateScreen();
      }));

    operatorButtons.forEach(operator =>
      operator.addEventListener('click', (evt) => {
        addOperator(evt);
        updateScreen();
      }));
  }

  addCalcEventListeners();
}())