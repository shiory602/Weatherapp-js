// var dayjs = require('dayjs');
// dayjs().format();
// dayjs.extend(utc)
// dayjs.extend(timezone)

const api = {
	key: "c05165900889e0c017b2ee9ad3a1a515",
	baseurl: "https://api.openweathermap.org/data/2.5/",
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


// // 曜日を表す文字列の配列を作っておく
// var WeekChars = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

// // 日付オブジェクトから曜日を得る
// var dObj = new Date( /* 何らかの日付 */ );
// var wDay = dObj.getDay();
// alert("指定の日は、" + WeekChars[wDay] + "です。");

// 曜日と月の表示
function dateBuilder(d) {
	// let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let day = days[d.getDay() + 1]; // array[index]
	// let date = d.getDate();
	// let month = months[d.getMonth()];
	// let year = d.getFullYear();

	return `${day}`;
	// return `${day} ${date} ${month} ${year}`;
}

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
	// 背景
	changeBg(query.weather[0].icon);

	// 気温
	temp.innerHTML = `${Math.round(query.main.temp)}<span>℃</span>`; //四捨五入

	// 日付
	var sec = query.dt; // get second
	var date = new Date(sec * 1000);
	var datestr = date.toLocaleDateString()
	var timestr = date.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	})
	$(".date").html(`${datestr} ${timestr}`);


	// 天気
	todaysWeather.innerHTML = query.weather[0].main;

	// アイコン
	let icon = `http://openweathermap.org/img/w/${query.weather[0].icon}.png`;
	weatherIcon.innerHTML = `<img src=${icon} width="100">`;

	// 都市・国名
	city.innerText = query.name;
	country.innerText = query.sys.country;

	high.innerText = Math.round(query.main.temp_max);
	low.innerText = Math.round(query.main.temp_min);
}


const getResults = (city) => {
	fetch(`${api.baseurl}weather?q=${city}&units=metric&appid=${api.key}`) // return promise // units=metric&-->change k to c tem
		.then(response => { // response = weather data
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
			fillData(query);
			hourlyResults(query);
		})
		.catch(error => {
			console.log(`We have an error ${error}`);
		})
}

// API references: https://openweathermap.org/api/one-call-api
const hourlyResults = (query) => {
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${query.coord.lat}&lon=${query.coord.lon}&date=${query.dt}&exclude=current,minutely,alert&units=metric&appid=${api.key}`)
		.then(response => { // response = weather data
			if (response.status !== 200) {
				console.log(`Oops! we have an error ${response.status}`);
			}
			return response.json()
		})
		.then((query) => {

			console.log(query);

				// 日付
	var sec = query.hourly[0].dt; // get second
	var date = new Date(sec * 1000);
	var datestr = date.toLocaleDateString()
	var timestr = date.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	})
	$(".date").html(`${datestr} ${timestr}`);

			// weekly -----------------------------------

			console.log(query.daily[0].dt);

			// 曜日
			let now = new Date(query.daily[0].dt * 1000);
			day1.innerText = dateBuilder(now);

			// アイコン
			let icon = `http://openweathermap.org/img/w/${query.daily[1].weather[0].icon}.png`;
			weekWeatherIcon1.innerHTML = `<img src=${icon} width="50">`;

			// 気温
			dayWeather1.innerHTML = `${Math.round(query.daily[1].temp.day)}<span>℃</span>`;




			// hourly -------------------------------------------

			var sec = query.hourly[7].dt; // get second
			var date = new Date(sec * 1000);
			var timestr = date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			});
			$(".weather1").html(`${timestr}<span>${query.hourly[7].weather[0].main}</span>`);

			var sec = query.hourly[14].dt; // get second
			var date = new Date(sec * 1000);
			var timestr = date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			})
			$(".weather2").html(`${timestr}<span>${query.hourly[14].weather[0].main}</span>`);

			var sec = query.hourly[21].dt; // get second
			var date = new Date(sec * 1000);
			var timestr = date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			})
			// console.log(date, timestr);
			$(".weather3").html(`${timestr}<span>${query.hourly[21].weather[0].main}</span>`);

		})
		.catch(error => {
			console.log(`We have an error ${error}`);
		})
}



let reloadDisplay = (v) => {
	if (v == "vancouver") {
		setTimeout(function () {
			location.reload(); // reload every 2 mins
		}, 120000);
	} else {
		setTimeout(function () {
			location.reload(); // reload every 2 mins
		}, 120000);
	}
}

let searchBox = document.getElementById("searchBox");
let form = document.getElementById("form-id");
form.addEventListener('submit', (e) => {
	e.preventDefault(); //フォーム送信を停止
	if (searchBox.value) {
		let cityName = searchBox.value;
		// .appendChild(cityName);
		getResults(cityName);
		// hourlyResults(e.value);
		reloadDisplay(cityName);
		searchBox.value = "" // clear the input
	} else {
		alert("it is empty");
	}
})

$(document).ready(() => {
	getResults("vancouver");
	// hourlyResults();
	reloadDisplay("vancouver");
})