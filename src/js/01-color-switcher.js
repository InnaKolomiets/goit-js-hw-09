function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

let colorChangeInterval;
const startButton = document.querySelector('#startButton');
const stopButton = document.querySelector('#stopButton');

function startColorChange() {
    startButton.disabled = true;
    stopButton.disabled = false;

    colorChangeInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopColorChange() {
    startButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(colorChangeInterval);
}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);