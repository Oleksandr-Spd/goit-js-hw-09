import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

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

  const formElements = e.target.elements;

  const delayInput = formElements['delay'];
  const stepInput = formElements['step'];
  const amountInput = formElements['amount'];

  let delayValue = Number(delayInput.value);

  const stepValue = Number(stepInput.value);
  const amountValue = Number(amountInput.value);

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
