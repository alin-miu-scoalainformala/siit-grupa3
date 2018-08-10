var cartList = [];
var productData;

function getDataOfObjectFromServer(idProdus){
    let main = document.querySelector('#main');

    let promise = fetch(`https://siit-buc3.firebaseio.com/onlineShop/products/${idProdus}.json`)
        .then(res => {
            main.innerHTML = `
                    <img class="" src="https://i.redd.it/ounq1mw5kdxy.gif" style="" alt="Card image cap">
            `;

            return res.json();
        });

    promise
        .then(res => {
            setTimeout(() => {
                productData = res;
                displayDescription(res);
            }, 500);

        })
        .catch(err => console.log(err));

}


function displayDescription(obj){
    let main = document.querySelector('#main');

    main.innerHTML = `<div class="card text-center mb-4 box-shadow">
                            <img class="card-img-top pt-3 " id="img" src="" style="width: 400px; height: 287.992px; margin-left: 30%;" alt="Card image cap">
                            <div class="card-body ml-5" style="float: right;">
                                <h5 class="card-title mb-4" id="title"></h5>
                                <h6 class="card-subtitle" id="price"></h6><br/>
                                <h6 class="card-subtitle" id="desc"></h6><br/>
                                <button class="btn btn-primary my-2 my-sm-0" onclick="storeCartInLocalStorage();">Add to cart</button>
                            </div>
                      </div>
                    `

    main.className = 'jumbotron container';

    document.getElementById('img').src = obj.img;
    document.getElementById('title').innerHTML = obj.title;
    document.getElementById('price').innerHTML = parsePrice(obj.price);
    document.getElementById('desc').innerHTML = obj.descriere;
}

function storeCartInLocalStorage(){
    if(localStorage.getItem('cart') === null){
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    let cartList = JSON.parse(localStorage.getItem('cart'));
    cartList.push({'nume': productData.title,
                   'key': getURLVars()['id'],
                   'cantitate': 1,
                   'pret': productData.price});
                   
    localStorage.cart = JSON.stringify(cartList);
}

function getURLVars(){
    let vars = [];
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}