let display = document.getElementById('display');
let history = document.getElementById('history');
let lastOperator = '';

function appendNumber(num) {
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else if (num === '.' && display.value.includes('.')) {
        return;
    } else {
        display.value += num;
    }
}

function appendOperator(op) {
    if (display.value === '') return;
    history.textContent = display.value + ' ' + op;
    lastOperator = op;
    display.value = '';
}

function calculate() {
    if (display.value === '' || history.textContent === '') return;
    
    try {
        const result = eval(history.textContent + display.value);
        display.value = Math.round(result * 100000000) / 100000000;
        history.textContent = '';
    } catch (e) {
        display.value = 'Error';
        history.textContent = '';
    }
}

function clearDisplay() {
    display.value = '0';
    history.textContent = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1) || '0';
}

display.value = '0';