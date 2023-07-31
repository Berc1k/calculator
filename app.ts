const Operation = {
  ADD: "+",
  SUB: "-",
  MUL: "*",
  DIV: "/",
  PER: "%",
  RES: "=",
};

let input: (number | string)[] = [];
let prevValue;
let currValue;
let currOperation;
let isOperationChoosen = false;
let resultHistory: number[] = [];
function UpdateDisplay() {
  const screen = document.getElementById("screen");
  if (screen) {
    screen.innerHTML = currValue;
  }
}

function inputToValue(input) {
  let dot = dotPosition(input);
  let beforeDot = 0;
  let AfterDot = 0;
  let ten;

  if (input[input.length - 1] == ".") {
    for (let i = 0; i < input.length - 1; i++) {
      beforeDot = beforeDot * 10;
      beforeDot = beforeDot + input[i];
    }
    return beforeDot;
  }
  if (dot > 0) {
    for (let i = 0; i < dot; i++) {
      beforeDot = beforeDot * 10;
      beforeDot = beforeDot + input[i];
    }
    for (let i = dot + 1; i < input.length; i++) {
      AfterDot = AfterDot * 10;
      AfterDot = AfterDot + input[i];
    }
    ten = input.length - dot - 1;
    ten = ten * -1;
    AfterDot = Math.pow(10, ten) * AfterDot;
    return beforeDot + AfterDot;
  }
  for (let i = 0; i < input.length; i++) {
    beforeDot = beforeDot * 10;
    beforeDot = beforeDot + input[i];
  }
  return beforeDot;
}

function dotPosition(input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i] == ".") return i;
  }
  return 0;
}
function writing(number) {
  if (input.length < 9) {
    switch (number) {
      case 1:
        input.push(1);
        console.log(input);
        break;
      case 2:
        input.push(2);
        console.log(input);
        break;
      case 3:
        input.push(3);
        console.log(input);
        break;
      case 4:
        input.push(4);
        console.log(input);
        break;
      case 5:
        input.push(5);
        console.log(input);
        break;
      case 6:
        input.push(6);
        console.log(input);
        break;
      case 7:
        input.push(7);
        console.log(input);
        break;
      case 8:
        input.push(8);
        console.log(input);
        break;
      case 9:
        input.push(9);
        console.log(input);
        break;
      case 0:
        input.push(0);
        console.log(input);
        break;
      case ".":
        if (dotPosition(input)) {
          console.log(input);
          break;
        }
        if (input.length == 0) {
          input.push(0);
        }
        input.push(".");
        console.log(input);
        break;
    }
  }
  isOperationChoosen = false;
  currValue = inputToValue(input);
  UpdateDisplay();
}

function setResult() {
  if (!currOperation) {
    return;
  }
  if (!currValue && currValue != 0) {
    currValue = 0;
    return;
  }

  let result;
  switch (currOperation) {
    case Operation.ADD:
      result = prevValue + currValue;
      break;
    case Operation.SUB:
      result = prevValue - currValue;
      break;
    case Operation.MUL:
      result = prevValue * currValue;
      break;
    case Operation.DIV:
      result = prevValue / currValue;
      break;
  }
  currValue = result;
}

function compute(operation) {
  if (isOperationChoosen) {
    return;
  }
  setResult();
  UpdateDisplay();
  isOperationChoosen = true;
  currOperation = operation;
  prevValue = currValue;
  currValue = undefined;
  input = [];
}

function clr() {
  input = [];
  currValue = 0;
  UpdateDisplay();
  isOperationChoosen = false;
}

function clrAll() {
  prevValue = undefined;
  currValue = 0;
  currOperation = undefined;
  input = [];
  isOperationChoosen = false;
  UpdateDisplay();
}

function result() {
  setResult();
  saveResult();
  currOperation = undefined;
  input = [];
  UpdateDisplay();
}

function saveResult() {
  if (!currValue && currValue != 0) {
    return;
  }
  resultHistory.push(currValue);
  var resultList = document.getElementById("results");
  var savedResult = document.createElement("li");
  savedResult.innerHTML = currValue;
  resultList.appendChild(savedResult);
}

clrAll();
