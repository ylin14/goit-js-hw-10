import { refs } from '../refs.js';

function createListMarkup(countriesArr) {
  const countryMarkup = countriesArr.map(({ flags, name }) => {
    return `<li class='country-item'>
               <img src='${flags.svg}' alt='${name.official}' class='flag'>
               <p>${name.official}</p>
            </li>`;
  }).join('');
  console.log(countryMarkup);
  return refs.list.innerHTML = countryMarkup;
}

function createCardMarkup(countriesArr) {
  const countryMarkup = countriesArr.map(({ flags, name, capital, population, languages }) => {
    return ` <div class='card-header'>
        <img src='${flags.svg}' alt='${name.official} flag' class='flag'>
        <h2><b>${name.official}</b></h2>
        </div>
            <ul>
              <li class='country-item'>Capital: ${capital}</li>
              <li class='country-item'> Language: ${Object.values(languages)}</li>
              <li class='country-item'>Population: ${population}</li>
            </ul>`;
  }).join('');

  return refs.card.innerHTML = countryMarkup;
}

function cleanMarkup() {
  refs.list.innerHTML = "";
  refs.card.innerHTML = "";
}


export { createListMarkup, createCardMarkup, cleanMarkup };