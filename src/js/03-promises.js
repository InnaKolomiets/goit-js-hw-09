import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({
            position: position,
            delay: delay
          });
        } else {
          reject({
            position: position,
            delay: delay
          });
        }
      },
        delay
      );
  });
}

const promiseForm = document.querySelector('.form');

const submitCallback = event => {
  event.preventDefault();

  let delay = Number(promiseForm.querySelector('[name="delay"]').value);
  const step = Number(promiseForm.querySelector('[name="step"]').value);
  const amount = Number(promiseForm.querySelector('[name="amount"]').value);

  const runPromise = (position, delay) => {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  };

  for (i = 1; i <= amount; i++) {
    runPromise(i, delay);
    delay += step;
  }
};

promiseForm.addEventListener('submit', submitCallback)
