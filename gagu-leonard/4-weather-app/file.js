
var af = [];
var afzi = [];
var final = []

function getWeather() {
    var location = document.getElementById('location').value
    var weatherr = new XMLHttpRequest();
    weatherr.open('GET', `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${location}`, false)
    weatherr.send(null);
    
    var r = JSON.parse(weatherr.response)
    var descriere = r.weather[0].description;
    var umiditate = r.main.humidity;
    var presiune = r.main.pressure;
    var temperatura_curenta = r.main.temp;
    var minima_zilei = r.main.temp_min;
    var maxima_zilei = r.main.temp_max;
    var icon = r.weather[0].icon
    document.getElementById('descriere').innerHTML = 'Descriere: ' + descriere
    document.getElementById('umiditate').innerHTML = 'Umiditate: ' + umiditate
    document.getElementById('presiune').innerHTML = 'Presiune: ' + presiune
    document.getElementById('temperatura_curenta').innerHTML = 'Temperatura curenta: ' + temperatura_curenta
    document.getElementById('minimazilei').innerHTML = 'Minima zilei: ' + minima_zilei
    document.getElementById('maximazilei').innerHTML = 'Maxima zilei: ' + maxima_zilei
    document.getElementById('icon').src = `http://openweathermap.org/img/w/${icon}.png`
    var lgn = r.coord.lon;
    var lat = r.coord.lat;
    myMap(lgn, lat);
    document.getElementById('vremeaAcum').innerHTML = 'Vremea acum in '+ location 
}
function myMap(lgn, lat) {

    var mapProp = {
        center: new google.maps.LatLng(lgn, lat),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

function getPrognoza() {
    
    var location = document.getElementById('location').value
    document.getElementById('location').value = ''
    var prog = new XMLHttpRequest();
    prog.open('GET', `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${location}`, false)
    prog.send(null);
    var p = JSON.parse(prog.response)
    var pezi = p.list;
    //document.getElementById('vremeaInUrmatoareleZile').innerHTML = 'Vremea in urmatoarele zile in '+ location


    for (let i = 0; i < pezi.length; i++) {
debugger
        var data = ''
        var ora = ''
        var temperatura = ''
        var descrierea = ''
        dataa = pezi[i].dt_txt.split('')
        data = dataa[0] + dataa[1] + dataa[2] + dataa[3] + dataa[4] + dataa[5] + dataa[6] + dataa[7] + dataa[8] + dataa[9];
        ora = dataa[11] + dataa[12] + dataa[13] + dataa[14] + dataa[15] + dataa[16] + dataa[17] + dataa[18]
        temperatura = pezi[i].main.temp
        descrierea = pezi[i].weather[0].description
        iconcode = pezi[i].weather[0].icon
        var afisat = {
            data: data,
            ora: ora,
            temperatura: temperatura,
            descrierea: descrierea,
            iconcode: iconcode
        }
        af.push(afisat)
    }
    inGroup()
    displyPrognoza()
    
}

function inGroup() {

    j = 0;
    

    for (let i = 0; i < af.length; i++) {
        if (af[i].data == af[j].data) {
            afzi.push(af[i]);
        } else {

            final.push(afzi)
            j = i
            i--
            afzi = [];
        }

    }
    final.push(afzi)
}
function displyPrognoza() {
    
    for (let i = 0; i < final.length; i++) {
            document.getElementById('zi' + i).innerHTML = final[i][0].data
        }
        
    
    for (let i = 0; i< final.length; i++) {
      for (let j = 0; j < final[i].length; j++) {
        
        var generated = document.getElementById('zi'+i+'content').innerHTML += `
                  
                  <img src = "http://openweathermap.org/img/w/${final[i][j].iconcode}.png">
                  <p>Ora : ${final[i][j].ora}</p>
                  <p>Temperatura : ${final[i][j].temperatura}</p>
                  <p>Descriere : ${final[i][j].descrierea}</p>
                  <hr>
                  
          `
          
      }
       
    }
    }
