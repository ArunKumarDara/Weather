const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const iconField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const searchField = document.querySelector(".searchField");
const searchBtn = document.querySelector(".search");

searchBtn.addEventListener("click", () => {
  event.preventDefault();
  const cityName = searchField.value;

  if (cityName) {
    fetchWeather(cityName);
  }
});

async function fetchWeather(cityName) {
  try {
    const apiToken = "caa4bee308724641a78162312240102";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiToken}&q=${cityName}&aqi=no`;

    const response = await fetch(url);
    const parsedJson = await response.json();

    const currentTemp = parsedJson.current.temp_c;
    const currentCondition = parsedJson.current.condition.text;
    const conditionIcon = parsedJson.current.condition.icon;
    const locationName = parsedJson.location.name;
    const localTime = parsedJson.location.localtime;

    updateDOM({
      currentTemp,
      currentCondition,
      conditionIcon,
      locationName,
      localTime,
    });
  } catch (error) {
    alert("Please, put a valid query");
    console.error(error);
  }
}

function updateDOM({
  currentTemp,
  currentCondition,
  conditionIcon,
  locationName,
  localTime,
}) {
  temperatureField.innerText = `${currentTemp} Celcius`;
  cityField.innerText = locationName;
  dateField.innerText = localTime;
  iconField.setAttribute("src", conditionIcon);
  weatherField.innerText = currentCondition;
}
