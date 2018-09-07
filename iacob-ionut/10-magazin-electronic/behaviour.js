var productsUrlList = 'https://finalonlineshop.firebaseio.com/.json';
async function getProductsFromServer() {
    var productsResponse = await fetch(productsUrlList)
    var products = await productsResponse.json();
    return products;
}

async function showProducts(productsPromise) {
    var products = await productsPromise;
    var generatedHTML = '';
    var productsIDs = Object.keys(products);
    productsIDs.forEach(productID => {
        var product = products[productID];
        generatedHTML += getGeneratedHTMLForProduct(productID, product);
    });
    document.getElementById('categories').innerHTML = generatedHTML;
}

function getGeneratedHTMLForProduct(productID, product) {
    var generatedHTML = `
        <div id = categoriesDiv>
            <img class = "categoryImage" src = ${product.Image} />
            <div class = "categoryName">${product.Name}</div>
            <div class = "categoryPrice">${product.Price}</div>
            <br>
            <button id = "seeMore" onclick = "seeMore('${productID}')">See more</button>
        </div>
    `;
    return generatedHTML;
}

function seeMore(productID) {
    window.location = `./productDetails.html?productID = ${productID}`;
}

function getProductIDFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var productID = params.get('productId');
    return productID;
}

async function getDetailsFromServer(productID) {
    var detailsResponse = await fetch (`https://finalonlineshop.firebaseio.com/Products/${productID}.json`);
    var details = await detailsResponse.json();
    return details;
}

async function seeDetails(productIDPromise) {
    var product = await productIDPromise;
    var generatedHTML = `
        <div id = "detailsAboutProduct">
            <img src = "${product.Image}" />
            <div>${product.Name}</div>
            <div>${product.Details}</div>
            <div>$ ${product.Price}</div>
            <div>${product.Qty}</div>
            <button id = "addToCart" onclick = "addToCart();">Add to cart</button>
        </div>
    `;
    document.getElementById('details').innerHTML = generatedHTML;
}
