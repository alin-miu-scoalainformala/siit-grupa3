var wheather = {};
var icon;

function showWheather(){
    let city = document.getElementById("cityInput");
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let temp = JSON.parse(this.response);

            wheather = Object.values(temp);
            console.log(wheather);
            displayWheather(wheather);
        }
    };
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${city.value}`, false);
    xhttp.send();
}

function displayWheather(list){
    let body = document.querySelector('ul');
    
    var mapOptions = {
        center: new google.maps.LatLng(list[0].lat, list[0].lon),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    console.log(list[0].lat);

    let generatedText = "";
        generatedText += `
            <li><img src="http://openweathermap.org/img/w/${wheather[1][0].icon}.png"></li>
            <li>Descriere: ${list[1][0].description}</li>
            <li>Umiditate: ${list[3].humidity}</li>
            <li>Presiune: ${list[3].pressure}</li>
            <li>Temperatura curenta: ${list[3].temp}</li>
            <li>Minima zilei: ${list[3].temp_min}</li>
            <li>Maxima zilei: ${list[3].temp_max}</li>
        `;
    body.innerHTML = generatedText;
}

function displayForecast(list){
    let body = document.querySelector('table tbody');
    let generatedText = "";
    let found = [];
    let hours = ['00:00:00', '03:00:00', '06:00:00', '09:00:00', '12:00:00', '15:00:00', '18:00:00', '21:00:00']

    for (let i = 0; i < hours.length; i++) {
        found = list[3].filter(element => element.dt_txt.split(' ')[1] == hours[i]);
        generatedText += '<tr>';
        for (let j = 0; j < found.length; j++) {
            generatedText += `<td>
                                <img src="http://openweathermap.org/img/w/${found[j].weather[0].icon}.png"><br/>
                                ${found[j].dt_txt}<br/>
                                ${found[j].main.temp}<br/>
                                ${found[j].weather[0].description}
                            </td>`;                    
        } 
        generatedText += '</tr>';
    }
    body.innerHTML = generatedText;
}

function showForecast(){
    let city = document.getElementById("cityInput");
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let temp = JSON.parse(this.response);

            wheather = Object.values(temp);
            displayForecast(wheather);
        }
    };
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${city.value}`, false);
    xhttp.send();
}
