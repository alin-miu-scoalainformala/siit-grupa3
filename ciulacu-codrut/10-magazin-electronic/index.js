async function getProductsFromServer(){
    var products = await http.GET(ALLPRODUCTS_URI);
    return products;
}

async function displayProducts(productsPromise){
    var products = await productsPromise;
    setTimeout(() => {
        initHTML();
        Object.keys(products).forEach(idProduct => {
            if(products[idProduct] != null){
                document.querySelector('.row').innerHTML += generatedHTMLForProducts(idProduct, products[idProduct]);
            }
        });
    }, 500);
}

function initHTML(){

    document.querySelector('#main').innerHTML =  `
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
    `;
}

function generatedHTMLForProducts(idProduct, elem){
    return `
        <a class="col-md-4" style="text-decoration: none;" href="details/details.html?id=${idProduct}">
            <div class="card text-center mb-4 box-shadow">
                <img class="card-img-top pt-3" src="${elem.img}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title mb-4">${elem.title}</h5>
                    <h6 class="card-subtitle">${parsePrice(elem.price)}</h6>
                </div>
            </div>
        </a>
    `;
}

function showFoundProducts(){
    var input = document.getElementById('searchbar');
    displayProducts(searchElement(input));
}

async function searchElement(input){
    var products = await getProductsFromServer();
    var res = [];
    

    if(input.value !== "") {
        for (let i = 0; i < products.length; i++) {
            if(products[i] != null) {
                if (products[i].title.includes(input.value)) {
                    res.push(products[i]);
                }
            }
        }
    }else{
        res = products;
    }

    return res;
}   

