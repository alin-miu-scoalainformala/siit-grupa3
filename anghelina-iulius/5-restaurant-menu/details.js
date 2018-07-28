// Folositi url-urile din variabilele de mai jos pentru a face requesturi catre server:
var MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";
var MENU_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/";
// Exemplu de apel pentru detalii preparat: https://restaurant-menu-v1.firebaseio.com/menu/0.json - unde 0 este id-ul preparatului

// capitalize function from stack overflow
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function getDetails() {
    var promise = new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(this.responseText);
                } else {
                    reject(this.statusText);
                }
            }
        };
        xhttp.open("GET", MENU_SERVER_URL, true);
        xhttp.send();
    });

    promise
        .then(responseFromPromise => {
            let menuAsJson = JSON.parse(responseFromPromise);
            if (menuAsJson !== null) {
                let menuValues = Object.values(menuAsJson.menu);

                generateDetails(menuValues);
            }
        })
        .catch(e => console.log(e));

}

function generateDetails(details) {
    let body = document.getElementById('details');
    var id = window.location.toString().split('=')[1];
    let element = details[id];

    let generatedBody = `
            <h2>${element.nume.capitalize()}</h2>
            <div id="details-line"></div>
            <button type="button" id="back-button" onclick="window.location.href='index.html'">
            <i class="fas fa-arrow-alt-circle-left"></i> Lista principală</button>
            <img src=${element.imagine}>
            <p><strong>Ingrediente:</strong> ${element.ingrediente}</p>
            <p><strong>Reteta:</strong> ${element.reteta}</p>
        `

    body.innerHTML = generatedBody;
}