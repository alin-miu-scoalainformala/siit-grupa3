
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
                  <a href="details.html" class="btn btn-primary d-flex justify-content-center" onclick= "displayDetails(`+i+`)" >Vezi reteta</a>
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
    debugger
    var dnume = document.getElementById('dnume')
    dnume.innerHTML(getMenu[i].nume)
}







