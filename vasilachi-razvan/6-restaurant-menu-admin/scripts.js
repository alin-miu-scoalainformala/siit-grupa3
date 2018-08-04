var select = document.querySelector.bind(document);
function getMenu() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "https://kfc-store.firebaseio.com/.json", true);
    xhttp.send();
}
getMenu();
function submitForm(event){
    event.preventDefault();
    let newProduct = {
        "product_name"          : select('#product-name').value,
        "product_price"         : select('#product-price').value,
        "product_description"   : select('#product-description').value
    };
    let product_category = select('#product-category').value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(JSON.parse(this.responseText));
        }
    };
    xhttp.open("POST", `https://kfc-store.firebaseio.com/meniu/${product_category}/.json`, true);
    xhttp.send(JSON.stringify((newProduct)));
}