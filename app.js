(function () {
  'use strict';

  const screen = document.querySelector('#screen');
  const clearButton = document.querySelector('#clear');
  const deleteButton = document.querySelector('#delete');
  const operandButtons = document.querySelectorAll('.operand');

  let onScreenValues = '';

  function addOperand(evt) {
    if (onScreenValues.length < 15) {
      onScreenValues += evt.target.value;
      updateScreen();
    }
  }

  function updateScreen() {
    screen.textContent = onScreenValues;
  }

  function clearScreen() {
    onScreenValues = '';
    updateScreen();
  }

  function deleteLastValue() {
    onScreenValues = onScreenValues.slice(0, -1);
    updateScreen();
  }

  function addCalcEventListeners() {
    clearButton.addEventListener('click', clearScreen);
    deleteButton.addEventListener('click', deleteLastValue);
    operandButtons.forEach(operand =>
      operand.addEventListener('click', (evt) => addOperand(evt)));
  }

  addCalcEventListeners();
}())