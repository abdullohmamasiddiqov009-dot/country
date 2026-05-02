import countries from "./main.js";

const themeToggle = document.getElementById("toggle");
const themeText = document.getElementById("dark");
const dropdownHeader = document.getElementById("cbd");
const dropdownList = document.getElementById("davlatlar");
const selectedRegion = document.getElementById("region");
const listItems = document.querySelectorAll("#davlatlar li");
const countresWrap = document.querySelector(".country-list");
const searchInput = document.querySelector(".in");
const body = document.body;

function updateUI(countryArr) {
  countresWrap.innerHTML = "";
  if (countryArr.length === 0) {
    countresWrap.innerHTML = `<h2 style="color: var(--text-color);">No matches found</h2>`;
    return;
  }
  countryArr.forEach((country) => {
    countresWrap.innerHTML += `
      <div class="country">
        <img src="${country.image}" alt="${country.name}" style="width:100%; height:160px; object-fit:cover; border-radius: 16px 16px 0 0;" />
        <div class="country-intro">
          <h3>${country.name}</h3>
          <p>Population: <span>${country.population.toLocaleString()}</span></p>
          <p>Region: <span>${country.region}</span></p>
          <p>Capital: <span>${country.capital}</span></p>
        </div>
      </div>`;
  });
}

updateUI(countries);

searchInput.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase().trim();
  const filtered = countries.filter((c) => c.name.toLowerCase().includes(val));
  updateUI(filtered);
});

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    const region = item.getAttribute("data-value").toLowerCase();
    selectedRegion.innerText = item.innerText;

    searchInput.value = "";

    if (region === "all") {
      updateUI(countries);
    } else {
      const filtered = countries.filter((c) =>
        c.region.toLowerCase().includes(region),
      );
      updateUI(filtered);
    }

    dropdownList.classList.remove("active");
  });
});


const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeText.innerText = "Light Mode";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  themeText.innerText = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

dropdownHeader.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownList.classList.toggle("active");
});

window.addEventListener("click", () => {
  dropdownList.classList.remove("active");
});
