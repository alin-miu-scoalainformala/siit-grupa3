var PRODUCTS_url = "https://proiect-final-4f962.firebaseio.com/Products/";
var SHOPPINGCART_url = "https://proiect-final-4f962.firebaseio.com/ShoppingCart/";
var ROOT_url = "https://proiect-final-4f962.firebaseio.com/";


function firstPageContent() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var divGol = "";
            var y = document.getElementById("Content");
            var productsJson = JSON.parse(this.response);
            var keys = Object.keys(productsJson);
            for (var i = 0; i < keys.length; i++) {
                divGol += `
                <div class="divProducts">
                    <div class="divImage">
                        <img class="Image" src="${productsJson[keys[i]].image}">
                    </div>
                    <hr>
                    <div class="productName">${productsJson[keys[i]].name}</div>
                    <div class="productPrice">${productsJson[keys[i]].price} RON</div>
                    <button class="productDescribeButton" onclick="goToDescription('${keys[i]}')">Descriere</button>
                </div>
                `
            }
            y.innerHTML = divGol;
        }
    };
    xhttp.open("GET", PRODUCTS_url + ".json", true);
    xhttp.send();
}

function goToDescription(idProdus) {
    window.location = `description.html?id=${idProdus}`;
}

function goToShoppingCart() {
    window.location = `shoppingCart.html`
}

function goToAdminPage() {
    window.location = `Admin.html`
}

/* DESCRIPTION PAGE FUNCTIONS */

function descriptionPage(idProdus) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var divGol = "";
            var y = document.getElementById("divContent");
            var singleProductJson = JSON.parse(this.response);
            y.innerHTML = `
            <div class="divLeft">
                <div class="divImageZoom">
                    <img class="Image" src="${singleProductJson.image}">
                </div>
                <div class="divProduct2Name">${singleProductJson.name}</div>
                <div class="divProduct2Price">${singleProductJson.price} RON</div>
            </div>
            <div class="divRight">
                <div class="divAvailability">${singleProductJson.stock} bucati</div>
                <div id="divQuantity">
                    <span>Cantitate:</span>
                    <input type="number" id="QuantityBox" value="0">
                </div>
                <button class="BuyButton" onclick="adaugaInCos(${singleProductJson.stock})">Adauga in cos</button>
            </div>
            <div class="divProductDescription">Descriere:</div>
            <p class="Paragraf">${singleProductJson.description}</p>
        </div>
            `
        }

    };
    xhttp.open("GET", PRODUCTS_url + idProdus + ".json", true);
    xhttp.send();

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}




function gestionareProduse() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var divGol = "";
            var y = document.getElementById("TableBody");
            var productsJson = JSON.parse(this.response);
            for (var i = 0; i < productsJson.length; i++) {
                divGol += `
                <tr>
                    <td class="TableCellImage">
                        <img class="ImageShoppingCart" src="${productsJson[i].image}">
                    </td>
                    <td class="TableCellName">${productsJson[i].name}</td>
                    <td class="TableCell">${productsJson[i].price} RON</td>
                    <td class="TableCell">${productsJson[i].stock}</td>
                    <td class="TableCell">
                        <a >Remove</a>
                    </td>
                </tr>
                `
            }
            y.innerHTML = divGol;
        }
    };
    xhttp.open("GET", PRODUCTS_url + ".json", true);
    xhttp.send();
}




/* ADAUGA IN COS (FROM DESCRIPTION PAGE) FUNCTION */
function adaugaInCos(stoc) {
    var cantitate = parseInt(document.getElementById("QuantityBox").value);
    if (cantitate < 0) { alert("Numar invalid!"); return; }
    if (cantitate > stoc) { alert("Stoc indisponibil!"); return; }
    var produsAdaugat = {
        "idProdus": getQueryVariable('id'),
        "cantitate": cantitate
    };
    alert('Produsul a fost adaugat in cos!');
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", SHOPPINGCART_url + ".json", true);
    xhttp.send(JSON.stringify(produsAdaugat));
}

/* ADAUGA IN COS (SHOPPING CART PAGE) FUNCTION */
function adaugaInTabel() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var numarProduse = 0;
            var total = 0;
            var divGol = "";
            var TableBody = document.getElementById("TableBody");
            var divTotal = document.getElementById("divTotal");
            var rootJson = JSON.parse(this.response);
            var productsJson = rootJson.Products;
            var shoppingJson = rootJson.ShoppingCart;
            var shoppingKeys = Object.keys(shoppingJson);
            for (var i = 0; i < shoppingKeys.length; i++) {
                divGol += `
                <tr id="trCart${i}">
                    <td class="TableCellImage"> <img class="ImageShoppingCart" src="${productsJson[shoppingJson[shoppingKeys[i]].idProdus].image}"></td>
                    <td class="TableCellName">${productsJson[shoppingJson[shoppingKeys[i]].idProdus].name}</td>
                    <td class="TableCell">${productsJson[shoppingJson[shoppingKeys[i]].idProdus].price} RON</td>
                    <td class="TableCell">${shoppingJson[shoppingKeys[i]].cantitate}</td>
                    <td class="TableCell">${productsJson[shoppingJson[shoppingKeys[i]].idProdus].price * shoppingJson[shoppingKeys[i]].cantitate}  RON</td>
                    <td class="TableCell">
                        <a  onclick="removeProduct('${shoppingKeys[i]}', this.parentElement.parentElement.id, ${shoppingJson[shoppingKeys[i]].cantitate}, ${productsJson[shoppingJson[shoppingKeys[i]].idProdus].price})">Remove</a>
                    </td>
                </tr>
                `;
                numarProduse+= shoppingJson[shoppingKeys[i]].cantitate;
                total+= productsJson[shoppingJson[shoppingKeys[i]].idProdus].price * shoppingJson[shoppingKeys[i]].cantitate;
            }
        TableBody.innerHTML= divGol;
        divTotal.innerHTML = `
        <div id="Cantitate">Numar produse: <span id="countProducts">${numarProduse}</span></div>
        <div id="TVA">TVA: <span id="TVA%">9%</span></div>
        <div id="Total">Total: <span id="TotalSpan">${total}</span> RON</div>
        <button id="Cumpara">Cumpara</button>
        `;
        }
    };
    xhttp.open("GET", ROOT_url + ".json", true);
    xhttp.send();
}

function removeProduct(key, rowID, cantitate, pret) {
    var sumaTotalaDiv= document.getElementById("TotalSpan");
    var sumaTotala= parseInt(sumaTotalaDiv.innerHTML);
    var countProductsDiv= document.getElementById("countProducts");
    var countProducts= parseInt(countProductsDiv.innerHTML);
    countProductsDiv.innerHTML= countProducts-cantitate;
    sumaTotalaDiv.innerHTML= sumaTotala-(cantitate*pret);
    document.getElementById("TableBody").removeChild(document.getElementById(rowID));
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", SHOPPINGCART_url+ key +".json", true);
    xhttp.send();
}

function adaugaInTabelAdmin() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var divGol = "";
            var TableBody = document.getElementById("TableBody");
            var productsJson = JSON.parse(this.response);
            var keys = Object.keys(productsJson);
            for (var i=0; i<keys.length; i++) {
                divGol+= `
                    <tr>
                        <td class="TableCellImage">
                            <img class="ImageShoppingCart" src="${productsJson[keys[i]].image}">
                        </td>
                        <td class="TableCellName">${productsJson[keys[i]].name}</td>
                        <td class="TableCell">${productsJson[keys[i]].price} RON</td>
                        <td class="TableCell">${productsJson[keys[i]].stock}</td>
                        <td class="TableCell">
                            <a>Remove</a>
                        </td>
                    </tr>  
                `;
            }
            TableBody.innerHTML = divGol;
        }
    };
    xhttp.open("GET", PRODUCTS_url + ".json", true);
    xhttp.send();
}