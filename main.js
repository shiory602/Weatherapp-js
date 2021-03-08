const api = {
	key: "c05165900889e0c017b2ee9ad3a1a515",
	baseurl: "https://home.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
	if (evt.keycode == 13) {
		// getResults(searchbox.value);
		console.log('searchbox.value');
	}
}