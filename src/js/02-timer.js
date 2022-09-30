import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('[data-start]');
const timerRef = document.querySelector('.timer');

let deadTime = null;
let deltaTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] - new Date() <= 0) {
      Notify.failure('Please choose a date in the future!');
      startBtnRef.disabled = true;
      return;
    }
    startBtnRef.disabled = false;
    deadTime = selectedDates[0];
    console.log(deadTime);
  },
};

startBtnRef.addEventListener('click', () => {
  timer.start(timerRef, deadTime);
});

flatpickr('#datetime-picker', options);

const timer = {
  timerId: null,
  refs: {},

  start(rootSelector, deadline) {
    this.getRefs(rootSelector);
    Notify.success('Congratulations! The countdown has begun!');
    this.timerId = setInterval(() => {
      deltaTime = deadline.getTime() - Date.now();

      startBtnRef.disabled = true;
      if (deltaTime <= 1000) {
        clearInterval(this.timerId);
        Notify.success('Congratulations! The date has come!!');
      }
      const data = this.convertMs(deltaTime);
      console.log(data);
      Object.entries(data).forEach(([name, value]) => {
        this.refs[name].textContent = this.addLeadingZero(value);
      });
    }, 1000);
  },
  getRefs(rootSelector) {
    this.refs.days = rootSelector.querySelector('[data-days]');
    this.refs.hours = rootSelector.querySelector('[data-hours]');
    this.refs.minutes = rootSelector.querySelector('[data-minutes]');
    this.refs.seconds = rootSelector.querySelector('[data-seconds]');
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};
