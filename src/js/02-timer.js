import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../css/02-timer.css"

const startButton = document.querySelector('[data-start]');
const selectedDate = document.querySelector('#datetime-picker');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      startButton.disabled = true;
      window.alert("Please choose a date in the future");
    } else {
      startButton.disabled = false;
    }
  },
};
flatpickr("#datetime-picker", options);

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

startButton.addEventListener('click', event => {
  startButton.disabled = true;
  const parsedDate = Date.parse(selectedDate.value);
  const interval = setInterval(() => {
      const { days, hours, minutes, seconds } = convertMs(parsedDate - Date.now());
      timerDays.textContent = addLeadingZero(days);
      timerHours.textContent = addLeadingZero(hours);
      timerMinutes.textContent = addLeadingZero(minutes);
      timerSeconds.textContent = addLeadingZero(seconds);

      if (days + hours + minutes + seconds === 0) {
        clearInterval(interval);
        return;
      }
    }, 1000);

})

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
