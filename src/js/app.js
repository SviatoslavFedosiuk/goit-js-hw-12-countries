import debounce from "lodash.debounce";
const inputRef = document.querySelector(".input");
const listRef = document.querySelector(".list");
const divRef = document.querySelector(".result");
let search = "";
import fetchCountries from "./fetchCountries.js";
import {
  alert,
  notice,
  info,
  success,
  error,
  defaultModules,
} from "@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
defaultModules.set(PNotifyMobile, {});
inputRef.addEventListener(
  "input",
  debounce((e) => {
    search = e.target.value;
    fetchCountries(search).then((res) => {
      console.log(res);

      if (search.length === 0) {
        listRef.textContent = "";
        divRef.textContent = "";
      }
      if (listRef.textContent !== 0) {
        divRef.textContent = ""
      }
      if (res.length > 10) {
        error({
          text: "Too many matches found. Please enter more specific query!",
          delay: 2000,
        });
      }
      if (res.length > 2 && res.length < 10) {
        listRef.innerHTML = res
          .map((country) => `<li>${country.altSpellings[1]}</li>`)
          .join("");
      }

      if (res.length === 1) {
        listRef.textContent = "";
        divRef.innerHTML = res
          .map(
            (country) => `
      <div class="before">
       <h1>${country.altSpellings[1]}</h1>
  <h2>Capital: ${country.capital[0]}</h2>
  <h2>Population: ${country.population}</h2>
  <h2>Languages:</h2>

  <ul>
    ${Object.values(country.languages)
      .map((language) => `<li>${language}</li>`)
      .join("")}
  </ul></div>
<img src="${country.flags.png}" alt="${country.flags.alt}" class="img">`,
          )
          .join("");
      }
    });
  }, 500),
);
