const baseUrl = "https://restcountries.com/v2/name/";

document.querySelector("#search-button").addEventListener("click", () => {
  loadData();
});

document
  .querySelector("#search-field")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      loadData();
    }
  });

async function loadData() {
  const countryInput = document.querySelector("#search-field").value;
  
  

  if (!countryInput) {
    return;
  }

  const countryData = await (await fetch(`${baseUrl}${countryInput}`)).json();

  if (countryData.status === 404) {
    handleError();
    return;
  }

  let currentCountry = countryData;

  if (countryData.length > 1) {
    currentCountry = validateCountrySearch(countryData, countryInput);
  }
  
  extractData(currentCountry[0]);
}

function extractData(country) {
  document.querySelector("#currency").textContent = "";
  document.querySelector("#country-name h2").textContent = country.name;
  document.querySelector("#capital p").textContent = country.capital;
  document.querySelector("#region p").textContent = country.region;
  document.querySelector("#subregion p").textContent = country.subregion;
  document.querySelector("#toplevel-domain p").textContent =
    country.topLevelDomain;

  document.querySelector("#population p").textContent = `${country.population
    .toLocaleString()
    .split(",")
    .join(" ")} people`;

  document.querySelector(
    "#telephone-code p"
  ).textContent = `+${country.callingCodes}`;

  document.querySelector("#time-zone p").textContent =
    country.timezones.join(", ");

  document.querySelector("#area p").textContent = `${country.area} km²`;
  let flag = document.querySelector("div img");
  flag.src = country.flag;

  currencyTabCreate(country);
  animationToggle();
  restInput ()
}

function currencyTabCreate(searchedCountry) {
  currency = document.querySelector("#currency");
  const countryCurrencies = searchedCountry.currencies;

  countryCurrencies.forEach((e) => {
    let pFirst = document.createElement("p");
    pFirst.textContent = "Currency:";
    currency.appendChild(pFirst);

    Object.entries(e).forEach((elem) => {
      let spanContainer = document.createElement("span");
      let divName = document.createElement("div");
      let divInfo = document.createElement("div");
      divName.textContent = `${elem[0]}:`;
      divInfo.textContent = elem[1];
      spanContainer.appendChild(divName);
      spanContainer.appendChild(divInfo);
      currency.appendChild(spanContainer);
    });
  });
}

function validateCountrySearch(data, country) {
  const validCountry = data.reduce((acc, curr) => {
    if (curr.name.toLowerCase() === country.toLowerCase()) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return validCountry;
}

function handleError() {
  const cont = document.querySelector("#search-container");
  let div = document.createElement("div");
  div.textContent = "Wrong name or code, please try again!";
  cont.appendChild(div);
  return;
}

function restInput () {
  document.querySelector("#search-field").value = ""
  document.querySelector("#search-container div").remove()
}

function animationToggle() {
  const container = document.querySelector("#info");
  container.classList.toggle("slide-in-fwd-center");
  setTimeout(() => {
    container.style.opacity = 1;
    container.classList.remove("slide-in-fwd-center");
  }, 500);
}
