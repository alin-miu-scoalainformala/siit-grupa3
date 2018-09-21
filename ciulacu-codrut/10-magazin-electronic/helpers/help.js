const ALLPRODUCTS_URI = 'https://siit-buc3.firebaseio.com/onlineShop/products/.json';
const PRODUCT_URI = 'https://siit-buc3.firebaseio.com/onlineShop/products/';
const SUFFIX = '.json';
const http = new Http();

function parsePrice(price){
    var point = String(price).indexOf('.');

    var befFloat = String(price).slice(0, point);
    var aftFloat = String(price).slice(point + 1, price.length);

    return `<span style="color: red;">${befFloat}<sup>${aftFloat}</sup>Lei</span>`;
}

function getProductIdFromURL(){
    var params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function verifyIfCartIsNullOrEmpty(){
    if(localStorage.getItem('cart') === null || localStorage.getItem('cart') === ''){
        localStorage.setItem('cart', JSON.stringify([]));
    }
}