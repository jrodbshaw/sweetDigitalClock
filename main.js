const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"Decemeber",
];

function setDate() {
	const now = new Date();
	const seconds = now.getSeconds();
	const minutes = now.getMinutes();
	const hours = now.getHours();
	const month = now.getMonth();
	const year = now.getFullYear();

	// setting the year and month
	document.querySelector(".month").innerHTML = months[month];
	document.querySelector(".year").innerHTML = year;

	// setting the seconds
	if (seconds < 10) {
		document.querySelector(".seconds").innerHTML = `0${seconds}`;
	} else {
		document.querySelector(".seconds").innerHTML = seconds;
	}
	// setting the minutes
	if (minutes < 10) {
		document.querySelector(".minutes").innerHTML = `0${minutes}`;
	} else {
		document.querySelector(".minutes").innerHTML = minutes;
	}
	// setting the hours
	if (hours > 12) {
		document.querySelector(".hour").innerHTML = `${hours - 12}`;
		document.querySelector("body").style.backgroundColor = "black";
		document.querySelector("body").style.color = "white";
		document.querySelector(".clock-face").style.border = "solid 1px white";
		document.querySelector(".clock-face").style.backgroundColor = "black";
	}
	if (hours < 10) {
		document.querySelector("body").style.backgroundColor = "skyblue";
		document.querySelector(".hour").innerHTML = `0 ${hours}`;
	} else {
		document.querySelector(".hour").innerHTML = `${hours}`;
	}
	if (hours <= 12) {
		document.querySelector("body").style.backgroundColor = "skyblue";
	}
}

// Add weather
const WEATHER_URL =
	"http://api.openweathermap.org/data/2.5/weather?lat=-27.20318&lon=153.03510&units=metric&APPID=502c0e356c1bec179a9906d3819a781e";
const promise = fetch(WEATHER_URL);
const weather = document.querySelector(".weather");
const fragment = document.createDocumentFragment();

promise
	.then(function(response) {
		const processingPromise = response.json();
		return processingPromise;
	})
	.then(function(processedResponse) {
		const temp = `current temp ${processedResponse.main.temp}°`,
			humidity = `humidity ${processedResponse.main.humidity}％`,
			tempMinMax = `˰${processedResponse.main.temp_min} ˯${processedResponse.main.temp_max}`;
		const weatherItems = [temp, humidity, tempMinMax];

		weatherItems.forEach(function(item) {
			let li = document.createElement("li");
			li.textContent = item;
			fragment.appendChild(li);
		});

		weather.appendChild(fragment);
	})
	.catch(function(error) {
		console.log(error);
	});

setInterval(setDate, 1000);
