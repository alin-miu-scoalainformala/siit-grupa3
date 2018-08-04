// datadase GET and POST
const MENU_SERVER_URL = "https://casa-informala.firebaseio.com/.json";
// datadase DELETE
const MENU_DELETE_ITEM_SERVER_URL = "https://casa-informala.firebaseio.com/"; //id.json
// datadase PATCH
const MENU_EDIT_ITEM_SERVER_URL = "https://casa-informala.firebaseio.com/"; //id.json

// database weird-named keys stored here
let weirdKeys = [];
// new EasyHTTP object
const http = new EasyHTTP;
// get forms for submit event listeners
let addItemForm = document.getElementById('create-new');
let modifyItemForm = document.getElementById('modify-form');

// get the menu
function getMenu() {
    http.get(MENU_SERVER_URL)
        .then(responseFromPromise => {
            let menuValues = Object.values(responseFromPromise);
            let menuKeys = Object.keys(responseFromPromise);
            weirdKeys.push(...menuKeys);
            generateAdminMenu(menuValues);
        })
        .catch(e => console.log(e));
}

// generate the menu with delete/modify buttons
function generateAdminMenu(list) {
    let body = document.getElementById('main-menu');

    let generatedBody = "";
    for (let i = 0; i < list.length; i++) {
        generatedBody += `
            <div class="menu-item">
                <img src=${list[i].url}>
                <h2>${list[i].name}</h2>
                <p class="ingrediente"><strong>Ingrediente:</strong> ${list[i].ingredients}</p>
                <button type="button" id="delete" onclick="window.location.href='delete.html?id=${weirdKeys[i]}.html'">Sterge</button>
                <button type="button" id="modify" onclick="window.location.href='modify.html?id=${weirdKeys[i]}.html'">Modifica</button>
            </div>
        `
    };
    if (body) { body.innerHTML = generatedBody; }
}

// listen for form submit and add item
if (addItemForm) {
    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let name = document.getElementById('recipe-name').value;
        let url = document.getElementById('recipe-URL-image').value;
        let ingredients = document.getElementById('recipe-ingredients').value;
        let description = document.getElementById('recipe-description').value;

        let menuItem = {
            "name": name,
            "url": url,
            "ingredients": ingredients,
            "description": description
        };

        if (name && url && ingredients) {
            document.querySelector('.error').style.display = 'none';
            document.querySelector('.error-url').style.display = 'none';
            document.querySelector('.error-ingredients').style.display = 'none';

            http.post(MENU_SERVER_URL, menuItem)
                .then(response => console.log(response))
                .catch(error => console.log(error));

            setTimeout(() => { window.location.href = 'timer.html' }, 500)

        } else if (!name) {
            document.querySelector('.error-name').style.display = 'inline';
            document.querySelector('.error-url').style.display = 'inline';
            document.querySelector('.error-ingredients').style.display = 'inline';

        } else if (!url) {
            document.querySelector('.error-name').style.display = 'none';
            document.querySelector('.error-url').style.display = 'inline';
            document.querySelector('.error-ingredients').style.display = 'inline';

        } else if (!ingredients) {
            document.querySelector('.error-name').style.display = 'none';
            document.querySelector('.error-url').style.display = 'none';
            document.querySelector('.error-ingredients').style.display = 'inline';

        }
    });
}

// delete function
function deleteEntry() {
    let id = window.location.toString().split('=')[1].split(".")[0];

    http.delete(`${MENU_DELETE_ITEM_SERVER_URL}${id}.json`)
        .then(response => console.log(response))
        .catch(e => console.log(e));

    setTimeout(() => { window.location.href = 'timer.html' }, 500)
}

// get the item details and populate modify form
function getModifyDetails() {
    let id = window.location.toString().split('=')[1].split(".")[0];

    http.get(`${MENU_EDIT_ITEM_SERVER_URL}${id}.json`)
        .then(response => {
            document.getElementById('recipe-name').value = response.name;
            document.getElementById('recipe-URL-image').value = response.url;
            document.getElementById('recipe-ingredients').value = response.ingredients;
            document.getElementById('recipe-description').value = response.description;
        })
        .catch(error => console.log(error));
}

// listen for form submit and modify the selected entry
if (modifyItemForm) {
    modifyItemForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let name = document.getElementById('recipe-name').value;
        let url = document.getElementById('recipe-URL-image').value;
        let ingredients = document.getElementById('recipe-ingredients').value;
        let description = document.getElementById('recipe-description').value;

        let id = window.location.toString().split('=')[1].split(".")[0];

        let menuItem = {
            "name": name,
            "url": url,
            "ingredients": ingredients,
            "description": description
        };

        if (name && url && ingredients) {
            http.put(`${MENU_EDIT_ITEM_SERVER_URL}${id}.json`, menuItem)
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }

        setTimeout(() => { window.location.href = 'timer.html' }, 500)
    });
}