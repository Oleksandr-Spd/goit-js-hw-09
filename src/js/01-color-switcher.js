function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const enableButton = () => {
  btnStart.disabled = false;
};
let intervalId = null;

btnStart.addEventListener('click', event => {
  btnStart.disabled = true;

  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
});

btnStop.addEventListener('click', event => {
  setTimeout(enableButton, 100);
  clearInterval(intervalId);
});
