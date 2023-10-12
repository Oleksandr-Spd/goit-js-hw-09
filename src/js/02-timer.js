import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const countdownElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const flatpickr = require('flatpickr');

const input = document.querySelector('#datetime-picker');
input.value = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const selectedDate = Date.parse(input.value);
    const currentTime = Date.now();

    if (selectedDate < currentTime) {
      Notiflix.Notify.warning('Please choose a date in the future.');
    } else {
      handleDateTimeChange();
    }
  },
};
flatpickr(input, options);

function handleDateTimeChange() {
  const selectedDate = Date.parse(input.value);
  const currentTime = Date.now();

  if (selectedDate > currentTime) {
    const timeDifference = selectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateCountdown(countdownElements, days, hours, minutes, seconds);
  }
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

function updateCountdown(elements, days, hours, minutes, seconds) {
  elements.days.textContent = addLeadingZero(days);
  elements.hours.textContent = addLeadingZero(hours);
  elements.minutes.textContent = addLeadingZero(minutes);
  elements.seconds.textContent = addLeadingZero(seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
const timer = {
  start() {
    setInterval(() => {
      handleDateTimeChange();
    }, 1000);
  },
};

timer.start();
