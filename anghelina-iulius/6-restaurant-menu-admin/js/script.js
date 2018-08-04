// firebase database GET
const MENU_SERVER_URL = "https://casa-informala.firebaseio.com/.json";

// new EasyHTTP object
const http = new EasyHTTP;

function getMenu() {
    http.get(MENU_SERVER_URL)
        .then(responseFromPromise => {
            let menuValues = Object.values(responseFromPromise);
            generateMenu(menuValues);
        })
        .catch(e => console.log(e));
}

function generateMenu(list) {
    let body = document.getElementById('main-menu');
    // console.log(list);
    let generatedBody = "";
    for (let i = 0; i < list.length; i++) {
        generatedBody += `
        <div class="menu-item clickable" onclick="window.location.href='detalii.html?id=${i}'">
            <img src=${list[i].url}>
            <h2>${list[i].name}</h2>
            <p class="ingrediente"><strong>Ingrediente:</strong> ${list[i].ingredients}</p>
        </div>
        `
    };
    body.innerHTML = generatedBody;
}

function getDetails() {
    http.get(MENU_SERVER_URL)
        .then(responseFromPromise => {
            let menuValues = Object.values(responseFromPromise);
            generateDetails(menuValues);
        })
        .catch(e => console.log(e));
}

function generateDetails(details) {
    let body = document.getElementById('details');
    let id = window.location.toString().split('=')[1];
    let element = details[id];

    let generatedBody = `
            <h2>${element.name}</h2>
            <div id="details-line"></div>
            <img src=${element.url}>
            <p><strong>Ingrediente:</strong> ${element.ingredients}</p>
            <p><strong>Reteta:</strong> ${element.description}</p>
        `

    body.innerHTML = generatedBody;
}

// filter tasks
let filter = document.querySelector('#filter');
if (filter) {
    filter.addEventListener('keyup', function (e) {
        const text = e.target.value.toLowerCase();

        document.querySelectorAll('.ingrediente').forEach(ingredient => {
            const item = ingredient.textContent;

            if (item.toLowerCase().indexOf(text) !== -1) {
                ingredient.parentElement.style.display = "block";
            } else {
                ingredient.parentElement.style.display = "none";
            }
        });
    });
}

// listen for admin form submit and redirect to admin.html
let loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let username = document.getElementById('user-name').value;
        let password = document.getElementById('password').value;

        if (username === "iulius" && password === "123abc") {
            document.querySelector('.error-user').style.display = "none"
            document.querySelector('.error-pass').style.display = "none"
            window.location.href = 'admin/timer.html';
        } else if (!username) {
            document.querySelector('.error-user').style.display = "inline"
        } else if (!password) {
            document.querySelector('.error-pass').style.display = "inline"
        } else {
            document.querySelector('.error-user').style.display = "none"
            document.querySelector('.error-pass').style.display = "none"
            document.querySelector('.error-incorrect').style.display = "inline"
        }
    });
}
