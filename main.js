const api = {
	key: "c05165900889e0c017b2ee9ad3a1a515",
	baseurl: "https://api.openweathermap.org/data/2.5/",
}

let temp = document.querySelector(".current .temp");
let date = document.querySelector(".current .date");
let todaysWeather = document.getElementById("todays-weather");
let weatherIcon = document.getElementById("weatherIcon");
let city = document.querySelector(".location .city");
let country = document.querySelector(".location .country");
let searchBox = document.getElementById("searchBox");
const input = document.querySelector('input[type="search"]');


function dateBuilder(d) {
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let day = days[d.getDay()]; // array[index]
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}

// function changeBg(todaysWeather) {
// 	console.log(todaysWeather);
// 	switch (todaysWeather) {
// 		case "Clouds":
// 			document.body.style.backgroundImage = url('img/cloudy.jpg');
// 			break;
// 		case "Storm":
// 			document.body.style.backgroundImage = url('./img/storm.jpg');
// 			break;
// 		case "Rainy":
// 			document.body.style.backgroundImage = url('./img/rainy.jpg');
// 			break;
// 		default:
// 			document.body.style.backgroundImage = url('./img/sunnybg.jpg');
// 			break;
// 	}
// }

function fillData(query) {
	temp.innerHTML = `${Math.round(query.main.temp)}<span>℃</span>`; //四捨五入

	let now = new Date();
	date.innerText = dateBuilder(now);

	todaysWeather.innerHTML = query.weather[0].main;
	// changeBg(query.weather[0].main);

	let icon = `http://openweathermap.org/img/w/${query.weather[0].icon}.png`;
	weatherIcon.innerHTML = `<img src=${icon} width="100">`;
	city.innerText = query.name;
	country.innerText = query.sys.country;
}


const getResults = () => {
	fetch(`${api.baseurl}weather?q=${searchBox}&units=metric&appid=${api.key}`) // return promise // units=metric&-->change k to c tem
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


const hourlyResults = (query) => {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${query.coord.lat}&lon=${query.coord.lon}&exclude=hourly&appid=${api.key}`)
	.then(response => { // response = weather data
		if (response.status !== 200) {
				console.log(`Oops! we have an error ${response.status}`);
			}
			return response.json()
		})
	.then((query) => {
		console.log(query);
	})
	.catch(error => {
		console.log(`We have an error ${error}`);
	})
}



// const tomorrow = new Date(now)

// weather1.innerHTML = `${day}<span>${tomorrow.setDate(tomorrow.getDate() + 1)}</span>`;
// let weather2 = document.querySelector(".current .weather2");
// let weather3 = document.querySelector(".current .weather3");


input.addEventListener('search', () => {
	searchBox.value = " " // clear the input
	searchBox = input.value;
	if (searchBox) {
		getResults();
		hourlyResults();
	} else {
		alert("it is empty")
	}
})

$(document).ready(() => {
	searchBox = "vancouver";
	getResults();
	// hourlyResults();
	setTimeout(function () {
		location.reload(); // reload every 2 mins
	}, 120000);
})