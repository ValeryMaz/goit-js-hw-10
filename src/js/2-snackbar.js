// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputData = document.querySelector('input[name="delay"]');
const btn = document.querySelector('.btn-not');

function submitForm(event) {
  event.preventDefault();
  const delay = Number(document.querySelector('input[name="delay"]').value);
  const selectedRadio = document.querySelector('input[name="state"]:checked');
  const selectedState = selectedRadio ? selectedRadio.value : null;

  if (isNaN(delay) || delay < 0) {
    iziToast.warning({
      title: 'Attention',
      message: 'Please enter a valid number',
    });
    return;
  }

  const makePromise = (delay, selectedState) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedState === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  };
  makePromise(delay, selectedState)
    .then(delay =>
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(message =>
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
      })
    );
}
form.addEventListener('submit', submitForm);
