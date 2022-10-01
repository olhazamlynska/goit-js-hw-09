import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
console.log(formRef);

formRef.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();

  console.log(event.currentTarget);
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  for (let i = 0; i < amount.value; i += 1) {
    const positionTarget = i + 1;
    const delayTarget = Number(delay.value) + i * Number(step.value);
    createPromise(positionTarget, delayTarget).then(onSuccess).catch(onError);
  }
  event.currentTarget.reset();
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
