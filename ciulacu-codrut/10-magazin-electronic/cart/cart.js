const transport = 0;

function getProductsInTheCart(){
    verifyIfCartIsNullOrEmpty();
    var cart = JSON.parse(localStorage.getItem('cart'));

    return cart;
}

function displayCart(productsInCart){
    initHTML(getProductsInTheCart());
    productsInCart.forEach((product, index) => {
        document.querySelector('tbody').innerHTML += generateHTMLForProducts(product, index);
    });
}

function  generateHTMLForProducts(product, index){
    return `<tr>
        <td style="width: 40%;"><a style="float: left;" href="../details/details.html?id=${product.key}">${product.nume}</a></td>
        <td style="width: 15%;"><span style="float: center;">${product.pret}</span></td>
        <td style="width: 15%;"><a style="float: left; text-decoration: none;" href="javascript:addCantity(${index});">+</a><span style="float: center;">${product.cantitate}</span><a style="float: right; text-decoration: none;" href="javascript:subtractCantity(${index});">-</a></td>
        <td style="width: 15%;">${calcSubtotal(index)}</td>
        <td style="width: 15%;"><a href="javascript:removeItem('${index}')">Remove</a></td>             
    </tr> `;
}

function removeItem(key){
    let list = getProductsInTheCart();

    list.splice(key, 1);

    localStorage.cart = JSON.stringify(list);

    displayCart(list);
}

function addCantity(key){
    let list = getProductsInTheCart();

    if(list[key].cantitate < list[key].inStoc)
        list[key].cantitate++;

    localStorage.cart = JSON.stringify(list);

    displayCart(list);
}

function subtractCantity(key){
    let list = getProductsInTheCart();

    if(list[key].cantitate > 1)
        list[key].cantitate--;

    localStorage.cart = JSON.stringify(list);

    displayCart(list);
}

function calcSubtotal(key){
    let list = getProductsInTheCart();
    let elem = list[key];

    let res = elem.pret * elem.cantitate;

    return res;
}

function calcTotal(list){
    let res = 0;
    list.forEach((element, index) => {
        res += calcSubtotal(index);
    });

    return res + transport;
}

function initHTML(list){
    document.querySelector('#main').innerHTML = `<div class="card box-shadow" id="all">
                        <div class="row card-body">
                            <h5 class="card-title ml-3">Shopping Cart</h5>
                        </div>
                        <table style="width: 100%;" class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nume</th>
                                    <th>Pret</th>
                                    <th>Cantitate</th>
                                    <th>SubTotal<th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                        <div>
                                <h5>Number of products: ${list.length}</h5>
                                <h5>Transport cost: ${transport}$</h5>
                                <h2>Total: ${calcTotal(list)}</h2>
                                <button class="btn btn-success">Buy Now</button> 
                            </div>
                    </div>`;
}

