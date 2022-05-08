// Described in documentation
import flatpickr from 'flatpickr';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix';

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

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (checkDates(selectedDates[0])) {
      try {
        refs.startBtn.disabled = false;
      } catch (err) {
        console.error(err);
      }
    } else {
      Notify.failure('Please, pick the date in the future.');
      try {
        refs.startBtn.disabled = true;
      } catch (err) {
        console.error(err);
      }
    }
    inputDate = selectedDates[0];
  },
};

const refs = {};
let inputDate = null;

window.addEventListener('DOMContentLoaded', onPageLoad);

function onPageLoad() {
  refs.startBtn = document.querySelector('[data-start]');
  refs.startBtn.disabled = true;
  refs.datetimeInput = document.querySelector('#datetime-picker');
  flatpickr(refs.datetimeInput, flatpickrOptions);
  refs.datetimeInput = refs.startBtn.addEventListener('click', e => onStartClick(e));
}

function onStartClick(e) {
  const btn = e.currentTarget;
  btn.disabled = true;
  const timer = setInterval(() => {
    const timeLeft = checkDates(inputDate);
    if (!timeLeft) {
      clearInterval(timer);
      Notify.success('It happened!');
      btn.disabled = false;
    }
    displayTime(timeLeft);
  }, 1000);
}

function displayTime(time) {
  const timeObj = convertMs(time);
  document.querySelector('[data-days]').textContent = timeObj.days.toString(10).padStart(2, '0');
  document.querySelector('[data-hours]').textContent = timeObj.hours.toString(10).padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = timeObj.minutes
    .toString(10)
    .padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = timeObj.seconds
    .toString(10)
    .padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function checkDates(date) {
  const curDate = new Date();

  if (date <= curDate) return null;

  const difference = date - curDate;
  return difference;
}
