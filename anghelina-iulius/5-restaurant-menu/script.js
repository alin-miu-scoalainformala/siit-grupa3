// Folositi url-urile din variabilele de mai jos pentru a face requesturi catre server:
var MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";
var MENU_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/";
// Exemplu de apel pentru detalii preparat: https://restaurant-menu-v1.firebaseio.com/menu/0.json - unde 0 este id-ul preparatului

// capitalize function from stack overflow
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function getMenu() {
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

                generateMenu(menuValues);
            }
        })
        .catch(e => console.log(e));
}

function generateMenu(list) {
    let body = document.getElementById('main-menu');
    // console.log(list);
    let generatedBody = "";
    for (let i = 0; i < list.length; i++) {
        generatedBody += `
            <div class="menu-item" onclick="window.location.href='detalii.html?id=${i}'">
                <img src=${list[i].imagine}>
                <h2>${list[i].nume.capitalize()}</h2>
                <p class="ingrediente"><strong>Ingrediente:</strong> ${list[i].ingrediente}</p>
            </div>
        `
    };
    body.innerHTML = generatedBody;
}

// filter tasks

const filter = document.querySelector('#filter');
filter.addEventListener('keyup', filterTasks);

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.ingrediente').forEach(ingredient => {
        const item = ingredient.textContent;

        if (item.toLowerCase().indexOf(text) !== -1) {
            ingredient.parentElement.style.display = "block";
        } else {
            ingredient.parentElement.style.display = "none";
        }
    });
}