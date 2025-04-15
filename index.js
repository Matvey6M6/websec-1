document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(".prev-result").textContent = localStorage.getItem('previousResult') || "";
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('calc-result')) calculate();
    });
});

function updateResult(result) {
    const [prev, curr] = [".prev-result", ".current-result"].map(s => document.querySelector(s));
    if (curr) {
        prev.textContent = curr.textContent;
        curr.textContent = result;
        localStorage.setItem('previousResult', result);
    }
}

function calculate() {
    const firstInput = document.querySelector("#first-number");
    const secondInput = document.querySelector("#second-number");
    const operation = document.querySelector(".select-operation").value;

    const firstNumber = parseFloat(firstInput.value);
    const secondNumber = parseFloat(secondInput.value);

    if (isNaN(firstNumber)) {
        firstInput.focus();
        return alert('Первое число заполнено некорректно!');
    }
    if (isNaN(secondNumber)) {
        secondInput.focus();
        return alert('Второе число заполнено некорректно!');
    }

    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "∗": (a, b) => a * b,
        "/": (a, b) => a / b,
        "%": (a, b) => a % b,
        "^": (a, b) => a ** b
    };

    if ((operation === "/" || operation === "%") && Math.abs(secondNumber) < Number.EPSILON) {
        secondInput.focus();
        return alert('Попытка деления на ноль');
    }

    try {
        const result = operations[operation]?.(firstNumber, secondNumber);
        if (typeof result !== 'number' || isNaN(result)) {
            throw new Error('Недопустимая операция');
        }
        const formattedResult = result % 1 === 0 ? 
            result.toString() : 
            parseFloat(result.toFixed(6)).toString();
        
        updateResult(`${firstNumber} ${operation} ${secondNumber} = ${formattedResult}`);
    } catch (error) {
        alert(`Ошибка вычисления: ${error.message}`);
    }
}