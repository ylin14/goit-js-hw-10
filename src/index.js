import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { refs } from './refs.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createListMarkup, createCardMarkup, cleanMarkup } from './js/markup';

// import _ from "lodash.debounce";
// refs.input.addEventListener("input", _.debounce(() => {
//     // fetchCountries()
//     console.log("Input handler call after 300ms pause");
//   }, DEBOUNCE_DELAY)
// );

const DEBOUNCE_DELAY = 300;


refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  cleanMarkup();
  const country = event.target.value.trim();

  // Якщо користувач повністю очищає поле пошуку, то HTTP-запит
  // не виконується, а розмітка списку країн або інформації про країну зникає.
  if (country === '') {
    return;
  }

  const countries = fetchCountries(country);
  countries.then(country => notifyIfError(country)).catch(() => Notify.failure('Щось не те, друже...'));
}

function notifyIfError(countriesArr) {
  if (countriesArr.length >= 10) {

    Notify.failure('Забагато країночок знайдено');

  } else if (countriesArr.length > 1 && countriesArr.length < 10) {

    Notify.info('Слухай, це - майже те, що треба!');

    return createListMarkup(countriesArr);

  } else if (countriesArr.length === 1) {

    Notify.success('Ну кайфи ж, братанчик!');
    return createCardMarkup(countriesArr);
  }
}

