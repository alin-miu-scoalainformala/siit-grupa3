
var getMenu = [];


function getMeniu() {

    // var getmenu = document.getElementById('getmenu').value
    var restaurantMenu = new XMLHttpRequest();
    restaurantMenu.open('GET', `https://restaurant-menu-v1.firebaseio.com/.json`, false)
    restaurantMenu.send(null);



    var r = JSON.parse(restaurantMenu.response)


    for (let i = 0; i < Object.keys(r.menu).length; i++) {
        var ingrediente = r.menu[Object.keys(r.menu)[i]].ingrediente;
        var ulrImagine = r.menu[Object.keys(r.menu)[i]].imagine || r.menu[Object.keys(r.menu)[i]].link_img;
        var nume = r.menu[Object.keys(r.menu)[i]].nume;
        var reteta = r.menu[Object.keys(r.menu)[i]].reteta;
        var menu = {
            ingrediente: ingrediente,
            ulrImagine: ulrImagine,
            nume: nume,
            reteta: reteta,
        }
        getMenu.push(menu);
    }
    
    removeBadUrl()

}

function displayMenu() {
    setTimeout(() => {
        for (let i = 0; i < getMenu.length; i++) {
            if (getMenu[i].ulrImagine == '' || getMenu[i].ulrImagine == undefined) {

            } else {
                document.getElementById('nedivizibil').innerHTML += `
                <div class= "elem ">
                <div  class="card" style="background-color:black" >
                <img class="card-img-top menu" src="${getMenu[i].ulrImagine}" alt="">
                <div class="card-body" >
                  <h5 class="card-title d-flex justify-content-center" style="color:white">${getMenu[i].nume}</h5>
                  <a href="#" class="btn btn-primary d-flex justify-content-center" onclick= "displayDetails(`+ i + `)" >Vezi reteta</a>
                </div>
              </div>
              </div>
                    `
            }
        }
    }, 1000);
}

function checkImage(imageSrc, good, bad) {

    var img = new Image();
    img.onload = good;
    img.onerror = bad;
    img.src = imageSrc;
}

function removeBadUrl() {

    for (let i = 0; i < getMenu.length; i++) {
        checkImage(`${getMenu[i].ulrImagine}`, function () { }, function () { getMenu[i].ulrImagine = undefined; });
    }
    displayMenu()
}

function displayDetails(i) {
    var opened = window.open("", "_self");
    opened.document.write(`<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Page Title</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
          crossorigin="anonymous">
  </head>
  
  <body id="display" style="background-color: black">
      <div class="container-fluid" style="color: aliceblue">
          <span class="dspan">
              <a href="contact.html">
                  <button class="btn btn-primary">Contact</button>
              </a>
              <a href="index.html">
                  <button class="btn btn-primary"> Menu</button>
              </a>
          </span>
          <h1 style="text-align: center">${getMenu[i].nume}</h1>
          <img src="${getMenu[i].ulrImagine}" alt="">
          <h3>Ingrediente</h3>
          <p>${getMenu[i].ingrediente}</p>
          <h3>Reteta</h3>
          <p>${getMenu[i].reteta}</p>
      </div>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
          crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
          crossorigin="anonymous"></script>
  </body>
  
  </html>`);
}
 function find() {
    debugger
    document.getElementById('divizibil').innerHTML = '';
     var input = document.getElementById('input').value
     document.getElementById('ingredientName').innerHTML = `Preparate sortate dupa ingredientul: ${input}`
     document.getElementById('ingredientName').setAttribute('class','ingredient')
     for (let i = 0; i < getMenu.length; i++) {
         var match = getMenu[i].ingrediente.search(input)
             if (match != -1 && getMenu[i].ulrImagine !== undefined) {
                document.getElementById('divizibil').innerHTML += `
                <div class= "elem ">
                <div  class="card" style="background-color:black" >
                <img class="card-img-top menu" src="${getMenu[i].ulrImagine}" alt="">
                <div class="card-body" >
                  <h5 class="card-title d-flex justify-content-center" style="color:white">${getMenu[i].nume}</h5>
                  <a href="#" class="btn btn-primary d-flex justify-content-center" onclick= "displayDetails(`+ i + `)" >Vezi reteta</a>
                </div>
              </div>
              </div>
                    `
             }
             
         }
         
     
 }







