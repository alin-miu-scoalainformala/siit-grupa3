var listaProduse = [];
var listaKey = [];



function getDataFromServer(callback){
    let body = document.querySelector('#main');
    let promise =
        fetch(`https://siit-buc3.firebaseio.com/onlineShop/products/.json`, {method: 'GET'})
        .then(res => {


            body.innerHTML += `
                    <img id="imaginePh" src="https://i.redd.it/ounq1mw5kdxy.gif" alt="Card image cap" style="">
            `;
            
            console.log(localStorage.getItem('cart'));

            if(JSON.parse(localStorage.getItem('cart')) === null || JSON.parse(localStorage.getItem('cart')) === ''){
                localStorage.setItem('cart', JSON.stringify([]));
            }

            return res.json();

        });

    promise
        .then(res => {
            setTimeout(() => {
                listaProduse = [];
                listaKey = [];

                for (obj in res) {
                    listaKey.push(obj);
                    listaProduse.push(res[obj]);
                }
                callback(listaProduse, listaKey);
            }, 500);
        })
        .catch();
}

function display(list, keys){
    let main = document.querySelector('#main');

    main.innerHTML = `
    <div id="all">
        <section class="jumbotron text-center">
            <div class="container">
                <h1 class="jumbotron-heading">Ca la mama acasa</h1>
                <p class="lead text-muted">Ca la mama acasa ofera cele mai bune produse facute exact ca acasa. Mancarea de pe site este facuta cu dragoste si cu grija de catre mame din toata tara. Vino si tu sa incerci mancarea noastra pentru a ramane cu un gust de mancarea traditionala.</p>
                <p>
                    <a href="#" class="btn btn-primary my-2">Afla mai multe despre noi</a>
                    <a href="#" class="btn btn-secondary my-2">Oferte</a>
                </p>
            </div>
        </section>

        <div class="album py-5 bg-light">
            <div class="container">

                <div class="row">

                </div>
            </div>
        </div>
    </div>
    `

    let body = document.querySelector('.row');

    let generatedHTML = "";
    for(let i = 0; i < list.length; i++){
        if(list[i] != null) {
            const key = keys[i];

            generatedHTML +=
                `
                <a class="col-md-4" style="text-decoration: none;" href="details/details.html?id=${key}">
                            <div class="card text-center mb-4 box-shadow">
                                <img class="card-img-top pt-3" src="${list[i].img}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title mb-4">${list[i].title}</h5>
                                    <h6 class="card-subtitle">${parsePrice(list[i].price)}</h6>
                                </div>
                            </div>
                        </a>
            `;
        }
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
            if(listaProduse[i] != null) {
                if (listaProduse[i].title.includes(input.value)) {
                    list.push(listaProduse[i]);
                    keys.push(listaKey[i]);
                } else {
                    console.log('test');
                }
            }
        }
    }else{
        console.log('test');
        list = listaProduse;
        keys = listaKey;
    }

    display(list, keys);
}

function parsePrice(price){
    var point = String(price).indexOf('.');

    var befFloat = String(price).slice(0, point);
    var aftFloat = String(price).slice(point + 1, price.length);

    return `<span style="color: red;">${befFloat}<sup>${aftFloat}</sup>Lei</span>`
}
