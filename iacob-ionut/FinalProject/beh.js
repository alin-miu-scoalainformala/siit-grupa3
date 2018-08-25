var listaProduseUrl /*productsListUrl*/ = 'https://onlineshop-c46bd.firebaseio.com/.json';
async function getProduseFromServer() /*getProductsFromServer*/ {
    var produseResponse /*productsResponse*/ = await fetch(listaProduseUrl/*productsListUrl*/);
    var produse /*products*/ = await produseResponse.json();
    return produse /*products*/;
    //console.log(produse/*products*/);
}

async function afisareProduse(produsePromise)/*showProducts(productsPromise)*/ {
    var produse = await produsePromise; /* var products = await productsPromise*/
    var generatedHTML = ''; //modul de a introduce valoarea
    var iduriProduse = Object.keys(produse);  /*var productsIds = Object.keys(products);*/
    iduriProduse.forEach(idProdus => {  /*productsIds.forEach(productId => {var product = products[productId]});*/
        var produs = produse[idProdus];
        generatedHTML += getGeneratedHTMLForProdus(idProdus, produs); /*generatedHTML += getGeneratedHTMLForProduct(productId, product);*/
    });
    document.getElementById('produse'/*'products'*/).innerHTML = generatedHTML;
    document.getElementById('detalii'/*'products'*/).innerHTML = generatedHTML;
}

function getGeneratedHTMLForProdus(idProdus, produs) {
    var generatedHTML = `
            <div class="categorie">
                <img src=${produs.Image} class="imagineCategorie" />
                <div class = "text">${produs.Name}</div>
                <button id="seeMore" onclick="showMore('${idProdus}')">See more</button>
            </div>
            `;
    return generatedHTML;
}

function showMore(idProdus) {
    window.location = `./detalii.html?idProdus=${idProdus}`;
}

function getIdProdusFromUrl() /*getProductIdFromUrl()*/ {
    var params = new URLSearchParams(window.location.search);
    var idProdus = params.get('idProdus'); /*var productId = params['productId']*/
    return idProdus; /*return productId*/
}

async function getDetalisFromServer(idProdus) /*(productId)*/ {
    var detaliiResponse = await fetch(`https://onlineshop-c46bd.firebaseio.com/${idProdus}.json`); /*var detailsResponse = await fetch(`https://emag-v1.firebaseio.com/produse/${productId}.json`);*/
    var detalii = await detaliiResponse.json(); /*var details = await detailsResponse.json();*/
    //console.log(detalii);  
    return detalii;
}

async function afisareBrands(detaliiPromise) {
    var detalii = await detaliiPromise;
    var generatedHTML = '';
    for (let i = 0; i<Object.keys(detalii).length; i++){
        let detaliu = detalii[Object.keys(detalii)[i]];
        generatedHTML += `
            <div class="brand">
                <img src = "${detaliu.Image} class="imagineBrand" />
                <div>${detaliu.Name}</div>
                <div></div>
                <div>$ ${detaliu.Price}</div>
                <div></div>
                <button id="details" onclick = "showDetails('${idProdus}')">Details</button>
            </div>
            `;

    
    }
    document.getElementById('detalii').innerHTML = generatedHTML;
}

function showDetails(idProdus) {
    window.location = `./detalii.html?idProdus=${idProdus}`;
    
}

async function getDetalisFromServer(idProdus) {
    var detaliiResponse = await fetch(`https://onlineshop-c46bd.firebaseio.com/${idProdus}.json`)
    var detalii = await detaliiResponse.json();
    return detalii;
}

async function afisareDetalii(detaliiPromise) {
    var detalii = await detaliiPromise;
    var generatedHTML = '';
    for (let i = 0; i < Object.keys(detalii).length; i++){
        let detaliu = detalii[Object.keys(detalii)[i]];
        generatedHTML += `
            <div class = "details">
                <img src = "${detaliu.Image} class = imagineProdus" />
                <div>${detaliu.Name}</div>;
                <div>${detaliu.Details}</div>;
                <div>$ ${detaliu.Price}</div>;
                <div>${detaliu.Qty}</div>;
                <button id="details" onclick = "addToCart('${idProdus}')">Add to cart!</button>
            </div>        
            `;
    }
   
    document.getElementById("detalii").innerHTML = generatedHTML;
}