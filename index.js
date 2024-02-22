"use strict";

let cards = document.querySelector(".card-wrapper");

function getData() {
  let url = "https://restcountries.com/v2/all";
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => "No data found")
    .finally(() => console.log("done"));
}

function renderMovies(data, cards) {
  if (data.length > 0) {
    data.forEach((el) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${el.flags.svg}" alt="">
        <h3>${el.name}</h3>
        <ul>
          <li><strong>Population:</strong> ${el.population}</li>
          <li><strong>Region:</strong> ${el.region}</li>
          <li><strong>Capital:</strong> ${el.capital}</li>
        </ul>`;
      cards.append(card);
    });
  } else {
    cards.html("<h1>No movies found</h1>");
  }
}

function searchFlags(data, searchWord) {
  data.then((el) =>
    renderMovies(
      el.filter((ele) => ele.name.toLowerCase().includes(searchWord)),
      cards
    )
  );
}

function sortOptionFlag(data, name) {
  data.then((el) =>
    renderMovies(
      el.filter((ele) => ele.region.toLowerCase().includes(name)),
      cards
    )
  );
}

const dataFlags = getData();
dataFlags.then((data) => renderMovies(data, cards));
