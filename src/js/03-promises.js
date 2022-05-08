import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  borderRadius: '16px',
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  clickToClose: true,
});

const refs = {};

window.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
  refs.form = document.querySelector('.form');
  refs.form.addEventListener('submit', onSubmitClick);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitClick(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const amount = Number.parseInt(formData.get('amount')),
    delay = Number.parseInt(formData.get('delay')),
    incr = Number.parseInt(formData.get('step'));
  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay + i * incr)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
