const api = {
	key: "c05165900889e0c017b2ee9ad3a1a515",
	baseurl: "https://api.openweathermap.org/data/2.5/",
}


function dateBuilder(d) {
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let day = days[d.getDay()]; // array[index]
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}


const getResults = () => {
	fetch(`${api.baseurl}weather?q=${searchBox}&units=metric&appid=${api.key}`) // return promise // units=metric&-->change k to c tem
	.then(response => { // response = weather data
		if (response.status !== 200) {
			if(response.status === 404) {
				alert("City is not found, please try again");
			} else {
				console.log(`Oops! we have an error ${response.status}`);
			}
			
			return;
		}
		return response.json()
	})
	.then((query) => {
		let temp = document.querySelector(".current .temp");
		temp.innerHTML = `${Math.round(query.main.temp)}<span>℃</span>`; //四捨五入
		
		let now = new Date();
		let date = document.querySelector(".current .date");
		date.innerText = dateBuilder(now);
		
		// // // why id? not class not querySelector
		// let todaysWeather = document.getElementsByClassName("todays-weather");
		let todaysWeather = document.getElementById("todays-weather");
		todaysWeather.innerHTML = query.weather[0].main;
		
		let weatherIcon = document.getElementById("weatherIcon");
		let icon = `http://openweathermap.org/img/w/${query.weather[0].icon}.png`;
		weatherIcon.innerHTML = `<img src=${icon} width="100">`;

		// const tomorrow = new Date(now)
		// let weather1 = document.querySelector(".current .weather1");
		// weather1.innerHTML = `${day}<span>${tomorrow.setDate(tomorrow.getDate() + 1)}</span>`;
		// let weather2 = document.querySelector(".current .weather2");
		// let weather3 = document.querySelector(".current .weather3");

		let city = document.querySelector(".location .city");
		city.innerText = query.name;

		let country = document.querySelector(".location .country");
		country.innerText = query.sys.country;
	})
	.catch(error => {
		console.log(`We have an error ${error}`);
	})
}

let searchBox = "vancouver";
const input = document.querySelector('input[type="search"]');
input.addEventListener('search', () => {
	// searchBox.value == " " clear the input
		searchBox = input.value;
		if(searchBox){
			getResults();
		;
		} else {
			alert("it is empty")
		}
})

$( document ).ready(() => {
	getResults();
})

