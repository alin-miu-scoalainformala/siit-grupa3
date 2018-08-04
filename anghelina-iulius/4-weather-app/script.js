let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// previn submit refresh, pastreaza functionalitate cu Enter
document.getElementById("button-get-weather").addEventListener("click", function (e) { e.preventDefault(); });

//capitalize function from stack overflow
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// variabile weather API
var URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"; // sufix .png

function getWeather() {
    let selectedCity = document.getElementById('enter-city').value;
    var xhttp = new XMLHttpRequest();
    if (selectedCity) {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let currentConditions = JSON.parse(xhttp.responseText);
                generateCurrentWeather(currentConditions);
            }
        };
        xhttp.open("GET", URL_CURRENT_WEATHER + selectedCity, false);
        xhttp.send();

        document.getElementById("current-weather").style.height = "330px";
    }
}

function getForecast() {
    let selectedCity = document.getElementById('enter-city').value;
    var xhttp = new XMLHttpRequest();
    if (selectedCity) {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let forecast = JSON.parse(xhttp.responseText);
                generateCurrentForecast(forecast);
            }
        };
        xhttp.open("GET", URL_FORECAST_WEATHER + selectedCity, false);
        xhttp.send();

        document.getElementById("forecast").style.top = "0";
        document.getElementById("forecast").style.maxHeight = "2000px";
    }
    

}

function generateCurrentWeather(city) {
    let body = document.getElementById('current-weather');
    let icon = `${URL_WEATHER_ICON_PREFIX}${city.weather[0].icon}.png`;

    let generatedEntries = `
        <h2>Weather now in <strong>${city.name}</strong></h2>
        <img src="${icon}" alt="">
        <ul class="current">
            <li>Now:  <strong>${city.weather[0].description.capitalize()}</strong></li>
            <li>Humidity: <strong> ${city.main.humidity}%</strong></li>
            <li>Pressure: <strong> ${city.main.pressure}</strong></li>
            <li>Currently: <strong> ${Math.floor(city.main.temp)} &#8451;</strong></li>
            <li>Minimum: <strong> ${Math.floor(city.main.temp_min)} &#8451;</strong></li>
            <li>Maximum: <strong> ${Math.floor(city.main.temp_max)} &#8451;</strong></li>
        </ul>
        <div class="map">
        <iframe src="https://maps.google.com/maps?q=${city.coord.lat},${city.coord.lon}&hl=es;z=14&amp;output=embed"></iframe>
        </div>
        `;

    body.innerHTML = generatedEntries;
}

function generateCurrentForecast(city) {
    let azi = document.querySelector('.azi');
    let maine = document.querySelector('.maine');
    let poimaine = document.querySelector('.poimaine');
    let raspoimaine = document.querySelector('.raspoimaine');
    let rasraspoimaine = document.querySelector('.rasraspoimaine');
    let rasrasraspoimaine = document.querySelector('.rasrasraspoimaine');

    let tableHead = document.querySelector('.forecast-table thead');
    let currentDate = new Date();

    let generatedAzi = "";
    let generatedMaine = "";
    let generatedPoimaine = "";
    let generatedRaspoimaine = "";
    let generatedRasraspoimaine = "";
    let generatedRasrasraspoimaine = "";

    let generatedHead = "";

    let dayArray = [];

    for (let i = 0; i < city.list.length; i++) {
        let icon = `${URL_WEATHER_ICON_PREFIX}${city.list[i].weather[0].icon}.png`;
        let date = new Date(Number(`${city.list[i].dt}000`));
        
        let fullDate = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

        if (!dayArray.includes(fullDate)) {
            dayArray.push(fullDate);
        }
        dayArray.push(
            {   
                "day": date.getDate(),
                "icon": icon,
                "hour": `${date.getHours()}:00`,
                "cond": city.list[i].weather[0].description.capitalize(),
                "temp": Math.floor(city.list[i].main.temp)
            }
        );
    }

    for (let i = 0; i < dayArray.length; i++) {

        if (typeof(dayArray[i]) === "string") {
            generatedHead += `
                <th>${dayArray[i]}</th>
            `;
        }
        if (dayArray[i].day === currentDate.getDate()) {
            generatedAzi += `
                <li><img src="${dayArray[i].icon}"></li>
                <li>Hour: <strong>${dayArray[i].hour}</strong></li>
                <li><strong>${dayArray[i].cond}</strong></li>
                <li>Temp: <strong>${dayArray[i].temp}&#8451;</strong></li>
                <li></li>
                `;
        } else if (dayArray[i].day === currentDate.getDate()+1) {
            generatedMaine += `
                <li><img src="${dayArray[i].icon}"></li>
                <li>Hour: <strong>${dayArray[i].hour}</strong></li>
                <li><strong>${dayArray[i].cond}</strong></li>
                <li>Temp: <strong>${dayArray[i].temp}&#8451;</strong></li>
                <li></li>
                `;
        } else if (dayArray[i].day === currentDate.getDate()+2) {
            generatedPoimaine += `
                <li><img src="${dayArray[i].icon}"></li>
                <li>Hour: <strong>${dayArray[i].hour}</strong></li>
                <li><strong>${dayArray[i].cond}</strong></li>
                <li>Temp: <strong>${dayArray[i].temp}&#8451;</strong></li>
                <li></li>
                `;
        } else if (dayArray[i].day === currentDate.getDate()+3) {
            generatedRaspoimaine += `
                <li><img src="${dayArray[i].icon}"></li>
                <li>Hour: <strong>${dayArray[i].hour}</strong></li>
                <li><strong>${dayArray[i].cond}</strong></li>
                <li>Temp: <strong>${dayArray[i].temp}&#8451;</strong></li>
                <li></li>
                `;
        } else if (dayArray[i].day === currentDate.getDate()+4) {
            generatedRasraspoimaine += `
                <li><img src="${dayArray[i].icon}"></li>
                <li>Hour: <strong>${dayArray[i].hour}</strong></li>
                <li><strong>${dayArray[i].cond}</strong></li>
                <li>Temp: <strong>${dayArray[i].temp}&#8451;</strong></li>
                <li></li>
                `;
        } else if (dayArray[i].day === currentDate.getDate()+5) {
            generatedRasrasraspoimaine += `
                <li><img src="${dayArray[i].icon}"></li>
                <li>Hour: <strong>${dayArray[i].hour}</strong></li>
                <li><strong>${dayArray[i].cond}</strong></li>
                <li>Temp: <strong>${dayArray[i].temp}&#8451;</strong></li>
                <li></li>
                `;
        }

    }

    tableHead.innerHTML = generatedHead;

    azi.innerHTML = generatedAzi;
    maine.innerHTML = generatedMaine;
    poimaine.innerHTML = generatedPoimaine;
    raspoimaine.innerHTML = generatedRaspoimaine;
    rasraspoimaine.innerHTML = generatedRasraspoimaine;
    rasrasraspoimaine.innerHTML = generatedRasrasraspoimaine;
}