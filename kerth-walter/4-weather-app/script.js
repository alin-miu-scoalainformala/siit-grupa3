function afisareVreme(city) {
	var city = document.getElementsByTagName("input")[0].value;
	var url = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" + city;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var vreme = JSON.parse(this.responseText);
			console.log(vreme);
			var str = "";
			str = `<li><span class="icon">&nbsp;<img src=http://openweathermap.org/img/w/${vreme.weather[0].icon}.png></span></li>
								<li>Descriere:&nbsp;${vreme.weather[0].description}</li>
								<li>Umiditate:&nbsp;${vreme.main.humidity}</li>
								<li>Presiune:&nbsp;${vreme.main.pressure}</li>
								<li>Temperatura curenta:&nbsp;${vreme.main.temp}</li>
								<li>Minima zilei:&nbsp;${vreme.main.temp_min}</li>
								<li>Maxima zilei:&nbsp;${vreme.main.temp_max}</li>`

			document.getElementById("vremeaAcum").innerHTML = str;
			var lat = vreme.coord.lat;
			var lon = vreme.coord.lon;
			var uluru = { lat: lat, lng: lon };
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 10,
				center: uluru
			});
			var marker = new google.maps.Marker({
				position: uluru,
				map: map
			});
		}
	}
	xhttp.open("GET", url);
	xhttp.send();
}

function afisarePrognoza(prognoza, e) {
	var city = document.getElementsByTagName("input")[0].value;
	var url = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" + city;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var prognoza = JSON.parse(this.responseText);
			console.log(prognoza);

			var today = new Date();
			var todayString = today.getDate() + "/" + ((today.getMonth() + 1 < 10) ? "0" : "") + (today.getMonth() + 1) + "/" + today.getFullYear();

			var today1 = new Date(today.getTime() + 24 * 60 * 60 * 1000);
			var today1String = today1.getDate() + "/" + ((today1.getMonth() + 1 < 10) ? "0" : "") + (today1.getMonth() + 1) + "/" + today1.getFullYear();

			var today2 = new Date(today1.getTime() + 24 * 60 * 60 * 1000);
			var today2String = today2.getDate() + "/" + ((today2.getMonth() + 1 < 10) ? "0" : "") + (today2.getMonth() + 1) + "/" + today2.getFullYear();

			var today3 = new Date(today2.getTime() + 24 * 60 * 60 * 1000);
			var today3String = today3.getDate() + "/" + ((today3.getMonth() + 1 < 10) ? "0" : "") + (today3.getMonth() + 1) + "/" + today3.getFullYear();

			var today4 = new Date(today3.getTime() + 24 * 60 * 60 * 1000);
			var today4String = today4.getDate() + "/" + ((today4.getMonth() + 1 < 10) ? "0" : "") + (today4.getMonth() + 1) + "/" + today4.getFullYear();

			var today5 = new Date(today4.getTime() + 24 * 60 * 60 * 1000);
			var today5String = today5.getDate() + "/" + ((today5.getMonth() + 1 < 10) ? "0" : "") + (today5.getMonth() + 1) + "/" + today5.getFullYear();

			str1 = `<div class="containerPrognoza">
									<div class="zi">Ziua: ${todayString}</div>
									<div class="zi">Ziua: ${today1String}</div>
									<div class="zi">Ziua: ${today2String}</div>
									<div class="zi">Ziua: ${today3String}</div>
									<div class="zi">Ziua: ${today4String}</div>
									<div class="zi">Ziua: ${today5String}</div>
									`

			var zi = prognoza.list[0].dt_txt[11] + prognoza.list[0].dt_txt[12];

			if (parseInt(zi) === 03) {
				str1 += `<div class="item"></div>`
			} else if (parseInt(zi) === 06) {
				str1 += `<div class="item"></div>
					 			<div class="item"></div>`
			} else if (parseInt(zi) === 09) {
				str1 += `<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>`
			} else if (parseInt(zi) === 12) {
				str1 += `<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>`
			} else if (parseInt(zi) === 15) {
				str1 += `<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>`
			} else if (parseInt(zi) === 18) {
				str1 += `<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>`
			} else if (parseInt(zi) === 21) {
				str1 += `<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>
					 			<div class="item"></div>`
			}

			for (var i in prognoza.list) {
				for (var j in prognoza.list[i].weather) {
					var ora = prognoza.list[i].dt_txt[11] + prognoza.list[i].dt_txt[12] + prognoza.list[i].dt_txt[13] + prognoza.list[i].dt_txt[14] + prognoza.list[i].dt_txt[15];
					str1 += `	<div class="item">
									<ul class="itemPrognoza">
										<li style="padding-left:15px"><img src=http://openweathermap.org/img/w/${prognoza.list[i].weather[j].icon}.png></li>
										<li>Ora: ${ora}</li>
										<li>Temperatura: ${prognoza.list[i].main.temp}</li>
										<li>Descriere: ${prognoza.list[i].weather[j].description}</li>
									</ul>
								</div>
							`

				}
			}

			document.querySelector(".containerPrognoza").innerHTML = str1;
		}
	}
	xhttp.open("GET", url);
	xhttp.send();
}
