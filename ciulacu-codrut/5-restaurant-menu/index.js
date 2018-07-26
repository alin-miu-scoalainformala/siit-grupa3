var listaProduse = [];
var keys = {};

function getItemsFromDatabase(callback){
    var promise = fetch(`https://restaurant-menu-v1.firebaseio.com/.json`,
    {method: 'GET'}).then(res => res.json());

    promise.then(res => {
        listaProduse = [];
        keys = [];


        keys = Object.keys(res.menu);
        listaProduse = Object.values(res.menu);
        //console.log(listaProduse);

        callback(listaProduse, keys);


    }).catch(err => console.log(err));
}

function displayProduse(list, obj_keys){
    let body = document.querySelector('.menu');

    let generatedHTML = "";
    for (let i = 0; i < list.length; i++) {
        console.log(list);
        const key = obj_keys[i];
        generatedHTML += `
        <div class="food">
            <img src="${list[i].imagine}" style="width: 10%; height: 10%; background-color: lightskyblue)">
            <p><h5>${list[i].nume}</h5>
            <p>${list[i].ingrediente}</p>
            <div class="right">
                    <a class="btn btn-lg btn-danger" role="button" href="details.html?id=${key}">Detalii</a>
            </div>
        </div><br/>
        `;
    }
    body.innerHTML = generatedHTML;
}

function getItemsThatContainIngredient(){
    var ingredient = document.getElementById('input');
    var list = [];
    var list_keys = [];

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

function displayDesc(obj) {
    let img = document.getElementById('img');
    let title = document.getElementById('titlu');
    let ingredients = document.getElementById('ingrediente');
    let desc = document.getElementById('desc');

    img.src = obj.imagine;
    title.innerText = obj.nume;
    ingredients.innerText = obj.ingrediente;
    desc.innerHTML = obj.reteta;
}

function getDetailsOfFood(id) {
    var promise = fetch(`https://restaurant-menu-v1.firebaseio.com/menu/${id}.json`,
        {method: 'GET'}).then(res => res.json());

    promise
        .then((res) => {
            displayDesc(res);
        })
        .catch(err => console.log(err));
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}