const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');

let intervalId = null;

function onBtnStartClick(event) {
  intervalId = setInterval(() => {
    const currentColor = getRandomHexColor();
    bodyRef.style.backgroundColor = currentColor;
    btnStartRef.disabled = true;
    btnStopRef.disabled = false;
  }, 1000);
}

function onBtnStopClick(event) {
  clearInterval(intervalId);
  btnStartRef.disabled = false;
  btnStopRef.disabled = true;
}
btnStartRef.addEventListener('click', onBtnStartClick);
btnStopRef.addEventListener('click', onBtnStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
