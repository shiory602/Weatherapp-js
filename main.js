// Weather API reference:  https://openweathermap.org/api/one-call-api

const api = {
	key: "c05165900889e0c017b2ee9ad3a1a515",
	baseurl: "https://api.openweathermap.org/data/2.5/", // main data
}

let temp = document.querySelector(".current .temp");
let date = document.querySelector(".current .date");
let todaysWeather = document.getElementById("todays-weather");
let weatherIcon = document.getElementById("weatherIcon");
let highLow = document.getElementById("high-low");
let weather1 = document.getElementById("weather1");
let weather2 = document.getElementById("weather2");
let weather3 = document.getElementById("weather3");
let city = document.querySelector(".location .city");
let country = document.querySelector(".location .country");
let high = document.querySelector(".high");
let low = document.querySelector(".low");

let day1 = document.querySelector(".week-day .day1");
let weekWeatherIcon1 = document.querySelector("#weekly-icon1");
let dayWeather1 = document.querySelector(".week-day .day-weather1");
let day2 = document.querySelector(".week-day .day2");
let weekWeatherIcon2 = document.querySelector("#weekly-icon2");
let dayWeather2 = document.querySelector(".week-day .day-weather2");
let day3 = document.querySelector(".week-day .day3");
let weekWeatherIcon3 = document.querySelector("#weekly-icon3");
let dayWeather3 = document.querySelector(".week-day .day-weather3");
let day4 = document.querySelector(".week-day .day4");
let weekWeatherIcon4 = document.querySelector("#weekly-icon4");
let dayWeather4 = document.querySelector(".week-day .day-weather4");
let day5 = document.querySelector(".week-day .day5");
let weekWeatherIcon5 = document.querySelector("#weekly-icon5");
let dayWeather5 = document.querySelector(".week-day .day-weather5");
let day6 = document.querySelector(".week-day .day6");
let weekWeatherIcon6 = document.querySelector("#weekly-icon6");
let dayWeather6 = document.querySelector(".week-day .day-weather6");


// Weekly date function for bottom-section -----------------------------------
function dateBuilder(d) {
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day = days[d.getDay()]; // array[index]
	return `${day}`;
}

// switch background images----------------------------------------------------
//icon list: https://openweathermap.org/weather-conditions
function changeBg(todaysWeather) {
	switch (todaysWeather) {
		case "01d":
			document.body.style.backgroundImage = "url('./img/sunnybg.jpg')";
			break;
		case "02d":
			document.body.style.backgroundImage = "url('./img/cloudy.jpg')";
			break;
		case "03d":
			document.body.style.backgroundImage = "url('./img/cloudy.jpg')";
			break;
		case "04d":
			document.body.style.backgroundImage = "url('./img/cloudy.jpg')";
			break;
		case "10d":
			document.body.style.backgroundImage = "url('./img/rainy.jpg')";
			break;
		case "50d":
			document.body.style.backgroundImage = "url('./img/rainy.jpg')";
			break;
		case "13d":
			document.body.style.backgroundImage = "url('./img/snow.jpg')";
			break;
		case "09d":
			document.body.style.backgroundImage = "url('./img/mist.jpg')";
			break;
			// night
		case "01n":
			document.body.style.backgroundImage = "url('./img/clearn.jpg')";
			break;
		case "02n":
			document.body.style.backgroundImage = "url('./img/cloudn.jpg')";
			break;
		case "03n":
			document.body.style.backgroundImage = "url('./img/cloudn.jpg')";
			break;
		case "04n":
			document.body.style.backgroundImage = "url('./img/cloudn.jpg')";
			break;
		case "10n":
			document.body.style.backgroundImage = "url('./img/rainyn.jpg')";
			break;
		case "50n":
			document.body.style.backgroundImage = "url('./img/rainyn.jpg')";
			break;
		case "13n":
			document.body.style.backgroundImage = "url('./img/snown.jpg')";
			break;
		case "09n":
			document.body.style.backgroundImage = "url('./img/mistn.jpg')";
			break;
		default:
			document.body.style.backgroundImage = "url('./img/sunny')";
			break;
	}
}

function fillData(query) {
	// background
	changeBg(query.weather[0].icon);

	// temperature
	temp.innerHTML = `${Math.round(query.main.temp)}<span>℃</span>`; //四捨五入

	// weather
	todaysWeather.innerHTML = query.weather[0].main;

	// weather icon
	let icon = `http://openweathermap.org/img/w/${query.weather[0].icon}.png`;
	weatherIcon.innerHTML = `<img src=${icon} width="100">`;

	// city
	city.innerText = query.name;
	// country
	country.innerText = query.sys.country;

	// temperature max/min in the bottom-section
	high.innerText = Math.round(query.main.temp_max);
	low.innerText = Math.round(query.main.temp_min);
}

// main fetch section
const getResults = (city) => {
	fetch(`${api.baseurl}weather?q=${city}&units=metric&appid=${api.key}`) // return promise
		// units=metric&-->change k to c tem
		.then(response => { // response = weather data
			// checking error and if city's name correct
			if (response.status !== 200) {
				if (response.status === 404) {
					alert("City is not found, please try again.");
				} else {
					console.log(`Oops! we have an error ${response.status}`);
				}
				return;
			}
			return response.json()
		})
		.then((query) => {
			fillData(query); // display
			hourlyResults(query); // import minutely, hourly, daily
		})
		.catch(error => {
			console.log(`We have an error ${error}`);
		})
}

// fetch local data
// API references: https://openweathermap.org/api/one-call-api
const hourlyResults = (query) => {
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${query.coord.lat}&lon=${query.coord.lon}&date=${query.dt}&exclude=current,alert&units=metric&appid=${api.key}`)
		.then(response => { // response = weather data
			if (response.status !== 200) {
				console.log(`Oops! we have an error ${response.status}`);
			}
			return response.json()
		})
		.then((query) => {

			// today ---------------------------------------------
			// getting date: Monday, March 15th, 2021
			var date = new Date();
			var datestr = date.toLocaleDateString('en-US', {
				weekday: "long",
				day: '2-digit',
				month: 'long',
				year: 'numeric',
				timeZone: query.timezone, // set timezone
			})

			// getting time
			var timestr = date.toLocaleString("en-US", {
				timeStyle: "short", // 12:00
				hourCycle: "h24",
				timeZone: query.timezone,
			})
			$(".date").html(`${datestr} ${timestr}`);



			// weekly -----------------------------------------------
			// weekly date
			let now = new Date(query.daily[1].dt * 1000);
			day1.innerText = dateBuilder(now);
			// weather icon
			let icon1 = `http://openweathermap.org/img/w/${query.daily[1].weather[0].icon}.png`;
			weekWeatherIcon1.innerHTML = `<img src=${icon1} width="80">`;
			// temperature
			dayWeather1.innerHTML = `${Math.round(query.daily[1].temp.day)}<span>℃</span>`;

			// 曜日
			let now2 = new Date(query.daily[2].dt * 1000);
			day2.innerText = dateBuilder(now2);
			// アイコン
			let icon2 = `http://openweathermap.org/img/w/${query.daily[2].weather[0].icon}.png`;
			weekWeatherIcon2.innerHTML = `<img src=${icon2} width="80">`;
			// 気温
			dayWeather2.innerHTML = `${Math.round(query.daily[2].temp.day)}<span>℃</span>`;


			// 曜日
			let now3 = new Date(query.daily[3].dt * 1000);
			day3.innerText = dateBuilder(now3);
			// アイコン
			let icon3 = `http://openweathermap.org/img/w/${query.daily[3].weather[0].icon}.png`;
			weekWeatherIcon3.innerHTML = `<img src=${icon3} width="80">`;
			// 気温
			dayWeather3.innerHTML = `${Math.round(query.daily[3].temp.day)}<span>℃</span>`;


			// 曜日
			let now4 = new Date(query.daily[4].dt * 1000);
			day4.innerText = dateBuilder(now4);
			// アイコン
			let icon4 = `http://openweathermap.org/img/w/${query.daily[4].weather[0].icon}.png`;
			weekWeatherIcon4.innerHTML = `<img src=${icon4} width="80">`;
			// 気温
			dayWeather4.innerHTML = `${Math.round(query.daily[4].temp.day)}<span>℃</span>`;


			// 曜日
			let now5 = new Date(query.daily[5].dt * 1000);
			day5.innerText = dateBuilder(now5);
			// アイコン
			let icon5 = `http://openweathermap.org/img/w/${query.daily[5].weather[0].icon}.png`;
			weekWeatherIcon5.innerHTML = `<img src=${icon5} width="80">`;
			// 気温
			dayWeather5.innerHTML = `${Math.round(query.daily[5].temp.day)}<span>℃</span>`;


			// 曜日
			let now6 = new Date(query.daily[6].dt * 1000);
			day6.innerText = dateBuilder(now6);
			// アイコン
			let icon6 = `http://openweathermap.org/img/w/${query.daily[6].weather[0].icon}.png`;
			weekWeatherIcon6.innerHTML = `<img src=${icon6} width="80">`;
			// 気温
			dayWeather6.innerHTML = `${Math.round(query.daily[6].temp.day)}<span>℃</span>`;



			// hourly --------------------------------------------------------------
			// 6 hours later
			var sec = query.hourly[7].dt; // get second
			var date = new Date(sec * 1000);
			var timestr = date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			});
			$(".weather1").html(`${timestr}<span>${query.hourly[7].weather[0].main}</span>`);

			// 12 hours later
			var sec = query.hourly[14].dt; // get second
			var date = new Date(sec * 1000);
			var timestr = date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			})
			$(".weather2").html(`${timestr}<span>${query.hourly[14].weather[0].main}</span>`);

			// 18 hours later
			var sec = query.hourly[21].dt; // get second
			var date = new Date(sec * 1000);
			var timestr = date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			})
			$(".weather3").html(`${timestr}<span>${query.hourly[21].weather[0].main}</span>`);

		})
		.catch(error => {
			console.log(`We have an error ${error}`);
		})
}


// update data every 2 mins
let setC;
let reloadDisplay = (v) => {
	setC = setTimeout(function () {
		getResults(v);
		reloadDisplay(v);
	}, 120000);
}


// submit event
let searchBox = document.getElementById("searchBox");
let form = document.getElementById("form-id");
form.addEventListener('submit', (e) => {
	e.preventDefault(); // stop form submitting
	if (searchBox.value) {
		clearTimeout(setC);
		let cityName = searchBox.value;
		getResults(cityName);
		reloadDisplay(cityName);
		searchBox.value = "" // clear the input
	} else {
		alert("it is empty");
	}
})

// first loaded (default)
$(document).ready(() => {
	getResults("vancouver");
	reloadDisplay("vancouver");
})