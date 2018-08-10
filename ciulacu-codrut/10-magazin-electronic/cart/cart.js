var transport = 0;

function getDataFromLocalStorgae(callback){

    let list = JSON.parse(localStorage.getItem('cart'));

    callback(list);
}

function displayCart(list){
    const main = document.getElementById('main');

    main.innerHTML = `<div class="card box-shadow" id="all">
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

    const body = document.querySelector('tbody');
    let txt = '';
    for (let i = 0; i < list.length; i++) {
        if(list[i] != null && list[i] != undefined) {
            txt += `<tr>
                        <td style="width: 40%;"><a style="float: left;" href="edit.html?id=${list[i].key}">${list[i].nume}</a></td>
                        <td style="width: 15%;"><span style="float: center;">${list[i].pret}</span></td>
                        <td style="width: 15%;"><a style="float: left; text-decoration: none;" href="javascript:addCantity(${i});">+</a><span style="float: center;">${list[i].cantitate}</span><a style="float: right; text-decoration: none;" href="javascript:subtractCantity(${i});">-</a></td>
                        <td style="width: 15%;">${calcSubtotal(i)}</td>
                        <td style="width: 15%;"><a href="javascript:removeItem('${i}')">Remove</a></td>             
                    </tr> `;
        }
    }


    body.innerHTML = txt;

}

function removeItem(key){

    let list = JSON.parse(localStorage.getItem('cart'));

    list.splice(key, 1);

    localStorage.cart = JSON.stringify(list);

    getDataFromLocalStorgae(displayCart);
}

function addCantity(key){
    let list = JSON.parse(localStorage.getItem('cart'));

    list[key].cantitate++;

    localStorage.cart = JSON.stringify(list);

    getDataFromLocalStorgae(displayCart);
}

function subtractCantity(key){
    let list = JSON.parse(localStorage.getItem('cart'));

    if(list[key].cantitate > 1)
        list[key].cantitate--;

    localStorage.cart = JSON.stringify(list);

    getDataFromLocalStorgae(displayCart);
}

function calcSubtotal(key){
    let list = JSON.parse(localStorage.getItem('cart'));
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