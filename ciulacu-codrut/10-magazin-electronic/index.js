var listaProduse = [];
var listaKey = [];

function getDataFromServer(){
    let promise =
        fetch(`https://siit-buc3.firebaseio.com/onlineShop/products/.json`, {method: 'GET'})
        .then(res => res.json());

    promise
        .then(res => {
            listaProduse = [];
            listaKey = [];

            for (obj in res){
                listaKey.push(obj);
                listaProduse.push(res[obj]);
                display(listaProduse, listaKey);
            }
        })
        .catch();
}

function display(list, keys){
    let body = document.querySelector('.row');

    let generatedHTML = "";
    for(let i = 0; i < list.length; i++){
        const key = keys[i];
        generatedHTML +=
            `
            <a class="col-md-4" style="text-decoration: none;" href="details.html?id=${key}">
                        <div class="card text-center mb-4 box-shadow">
                            <img class="card-img-top pt-3" src="${list[i].img}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title mb-4">${list[i].title}</h5>
                                <h6 class="card-subtitle">${list[i].price}</h6>
                            </div>
                        </div>
                    </a>
        `;
    }
    body.innerHTML = generatedHTML;
}


function searchElement(){
    var input = document.getElementById('searchbar');
    var list = [];
    var keys = [];

    if(input.value !== "") {
        for (let i = 0; i < listaProduse.length; i++) {
            console.log('test');
            if (listaProduse[i].title.includes(input.value)) {
                list.push(listaProduse[i]);
                keys.push(listaKey[i]);
            } else {
                console.log('test');
            }
        }
    }else{
        console.log('test');
        list = listaProduse;
        keys = listaKey;
    }

    display(list, keys);
}

function getDataOfObjectFromServer(idProdus){
    let promise = fetch(`https://siit-buc3.firebaseio.com/onlineShop/products/${idProdus}.json`).then(res => res.json());

    promise
        .then(res => {
            displayDescription(res);
        })
        .catch(err => console.log(err));

}

function displayDescription(obj){
    document.getElementById('img').src = obj.img;
    document.getElementById('title').innerHTML = obj.title;
    document.getElementById('price').innerHTML = obj.price;
    document.getElementById('desc').innerHTML = obj.descriere;
}

function getURLVars(){
    let vars = [];
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}