var listaProduse = [];
var keys = [];


function getDataFromDatabase(callback) {
    let body = document.querySelector('.main');
    let promise = fetch(`https://siit-buc3.firebaseio.com/meniuRestaurant/.json`, {method: 'GET'})
        .then(res => {
            body.innerHTML = `
                <img src="https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif" style="width: 10%; height: 10%;">
            `;
            return res.json();
        });

    promise
        .then(res => {
            setTimeout(() => {
                listaProduse = Object.values(res);
                keys = Object.keys(res);

                callback(listaProduse, keys);
            }, 500);


        })
        .catch(err => console.error(err));

    console.log(promise);
}

function displayProduse(list, obj_keys){
    let main = document.querySelector('.main');


    main.innerHTML = `
        <div class="input">
                <div class="form-inline mt-2 mt-md-0">
                    <input autocomplete="off" class="form-control mr-sm-0" id="input" type="text" placeholder="Put here the ingredient">
                    <button class="btn btn-success my-2 my-sm-2" type="submit" onclick="getItemsThatContainIngredient();">Search For intredient</button>
                </div>
                <div class="menu">

                </div>
    `;

    let body = document.querySelector('.menu');
    let generatedHTML = "";
    for (let i = 0; i < list.length; i++) {
        if(list[i] != null) {
            console.log(list);
            const key = obj_keys[i];
            generatedHTML += `
                <div class="food">
                    <img src="${list[i].imagine}" style="width: 10%; height: 10%; background-color: lightskyblue">
                    <p><h5>${list[i].nume}</h5>
                    <p style="display: inline;">${list[i].ingrediente}</p>
                    <div class="right">
                            <a class="btn btn-lg btn-primary" role="button" href="modify.html?id=${key}">Modifica</a>
                            <a class="btn btn-lg btn-danger" role="button" href="delete.html?id=${key}">Sterge</a>
                    </div>
                </div><br/>
            `;
        }
    }
    body.innerHTML = generatedHTML;
}

function getItemsThatContainIngredient(){
    let ingredient = document.getElementById('input');
    let list = [];
    let list_keys = [];

    if(ingredient.value !== '') {
        for (let i = 0; i < listaProduse.length; i++) {
            if (listaProduse[i].ingrediente.includes(ingredient.value)) {
                list.push(listaProduse[i]);
                list_keys.push(keys[i]);
                displayProduse(list, list_keys);
            }
        }
    }else{
        displayProduse(listaProduse, keys);
    }
}

function addItem(){
    let newClient = {
        "nume": document.getElementById('nume').value,
        "imagine": document.getElementById('url').value,
        "ingrediente": document.getElementById('ingrediente').value,
        "reteta": document.getElementById('reteta').value
    };
    let promise = fetch(`https://siit-buc3.firebaseio.com/meniuRestaurant/.json`, {method: 'POST', body: JSON.stringify(newClient)});

    promise
        .then(() => window.location.href = 'index.html')
        .catch(err => console.log(err));
}

function populateModify(key) {
    let promise = fetch(`https://siit-buc3.firebaseio.com/meniuRestaurant/${key}.json`, {method: 'GET'})
        .then(res => res.json());

    promise
        .then(res => {

            document.getElementById('nume').value = res.nume;
            document.getElementById('url').value = res.imagine;
            document.getElementById('ingrediente').value = res.ingrediente;
            document.getElementById('reteta').value = res.reteta;
        })
        .catch(err => console.error(err));


}

function modifyItem(key) {
    let newClient = {
        "nume": document.getElementById('nume').value,
        "imagine": document.getElementById('url').value,
        "ingrediente": document.getElementById('ingrediente').value,
        "reteta": document.getElementById('reteta').value
    };
    let promise = fetch(`https://siit-buc3.firebaseio.com/meniuRestaurant/${key}.json`, {method: 'PUT', body: JSON.stringify(newClient)});

    promise
        .then(() => window.location.href = 'index.html')
        .catch(err => console.log(err));
}

function populateDelete(key) {
    let promise = fetch(`https://siit-buc3.firebaseio.com/meniuRestaurant/${key}.json`, {method: 'GET'})
        .then(res => res.json());

    promise
        .then(res => {

            document.getElementById('nume').innerHTML = res.nume;
        })
        .catch(err => console.error(err));


}

function deleteItem(key) {

    let promise = fetch(`https://siit-buc3.firebaseio.com/meniuRestaurant/${key}.json`, {method: 'DELETE'});

    promise
        .then(() => window.location.href = 'index.html')
        .catch(err => console.log(err));
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
