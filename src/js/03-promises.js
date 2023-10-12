import Notiflix from 'notiflix';

const createBtn = document.querySelector('button[type="submit"]');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

createBtn.addEventListener('click', onSubmit);

function createPromise(position, delayValue) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay: delayValue });
      } else {
        reject({ position, delay: delayValue });
      }
    }, delayValue);
  });
}
function onSubmit(e) {
  e.preventDefault();

  let delayValue = Number(delayInput.value);
  let stepValue = Number(stepInput.value);
  let amountValue = Number(amountInput.value);

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayValue += stepValue;
  }
}
