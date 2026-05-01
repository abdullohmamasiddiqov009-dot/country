const themeToggle = document.getElementById("toggle");
const themeText = document.getElementById("dark");
const dropdownHeader = document.getElementById("cbd");
const dropdownList = document.getElementById("davlatlar");
const selectedRegion = document.getElementById("region");
const listItems = document.querySelectorAll("#davlatlar li");
const countresWrap = document.querySelector(".country-list");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeText.innerText = "Light Mode";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeText.innerText = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeText.innerText = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

dropdownHeader.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownList.classList.toggle("active");
});

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    selectedRegion.innerText = item.innerText;
    dropdownList.classList.remove("active");
  });
});

window.addEventListener("click", () => {
  dropdownList.classList.remove("active");
});
import countries from "./main.js";
console.log(countries);
countries.forEach((country) => {
  countresWrap.innerHTML += `  <div class="country">
        <img src="${country.image}" alt="" />
        <div class="country-intro">
          <h3>${country.name}</h3>
          <p>Population <span>${country.population}</span></p>
          <p>Region <span>${country.region}</span></p>
          <p>Capital <span>${country.capital} </span></p>
        </div>
      </div>`;
});
