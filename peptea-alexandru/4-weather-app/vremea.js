var URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"; // sufix .png
var weather = {};

function afiseazaVremea() {
	var input = document.getElementById("localitate");
	
	var URL_CURRENT_WEATHER_final = URL_CURRENT_WEATHER + input.value;
 	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let serverData = this.response;
			let serverDataAsJson = JSON.parse(serverData);
			
			//console.log(serverDataAsJson.main.temp);
			var icon = serverDataAsJson.weather[0].icon;
			var descriere = serverDataAsJson.weather[0].description;
			var umiditate = serverDataAsJson.main.humidity;
			var presiune = serverDataAsJson.main.pressure;
			var temp = serverDataAsJson.main.temp;
			var tempMin = serverDataAsJson.main.temp_min;
			var tempMax = serverDataAsJson.main.temp_max;
			
			document.getElementById("iconita").src = 'http://openweathermap.org/img/w/' + icon + '.png';
			document.getElementById("descriere").innerHTML = descriere;
			document.getElementById("umiditate").innerHTML = umiditate;
			document.getElementById("presiune").innerHTML = presiune;
			document.getElementById("temperaturaCurenta").innerHTML = temp;
			document.getElementById("minimaZilei").innerHTML = tempMin;
			document.getElementById("maximaZilei").innerHTML = tempMax;
			//`http://openweathermap.org/img/w/${icon}.png`;
			
			
			var mapOptions = {
				center: new google.maps.LatLng(serverDataAsJson.coord.lat, serverDataAsJson.coord.lon),
				zoom: 11,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			var map = new google.maps.Map(document.getElementById("continutDreapta"), mapOptions);

			
			/*	<span id="iconita"></span></p>
				 <p>Descriere: <span id="descriere"></span> </p> 
				 <p>Umiditate: <span id="umiditate"></span></p> 
				 <p>humidity:  <span id="presiune"></span></p> 
				 <p>Temperatura curenta: <span id="temperaturaCurenta"></span></p> 
				 <p>Minima zilei: <span id="minimaZilei"></span></p> 
				 <p>Maxima zilei: <span id="maximaZilei"></span></p> 
				 <p>Prognoza meteo: <span id="prognozaMeteo"></span></p> 
				 
			*/
		}
	
	};

	xhttp.open("GET", URL_CURRENT_WEATHER_final, false);
	xhttp.send();
}