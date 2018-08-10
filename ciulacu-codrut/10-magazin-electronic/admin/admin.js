var Keys = [];

function displayTableOfProduse(list, keys){
    const main = document.getElementById('main');

    main.innerHTML = `<div class="card box-shadow" id="all">
                        <div class="row card-body">
                            <h5 class="card-title ml-3">Gestionare produse</h5>
                            <button class="btn btn-primary" style="margin-left: 65%;"><a href="add.html" style="text-decoration: none; color: white;">Add Item</a></button>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Imagine</th>
                                    <th>Nume</th>
                                    <th>Pret</th>
                                    <th>Cantitate</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>`;

    const body = document.querySelector('tbody');
    let txt = '';
    for (let i = 0; i < list.length; i++) {
        if(list[i] != null) {
            const key = keys[i];

            txt += `<tr>
                        <td style="width: 1%;"><img src="${list[i].img}" style="width: 60%; height: 7%;"></td>
                        <td style="width: 10%;"><a style="float: left;" href="edit.html?id=${i}">${list[i].title}</a></td>
                        <td style="width: 1%;">${list[i].price} Lei</td>
                        <td style="width: 1%;"><span style="float: right;">${list[i].cantitate}</span></td>
                        <td style="width: 1%;"><a href="javascript:removeItem('${key}')">Remove</a></td>
                    </tr>`;
        }
    }
    body.innerHTML = txt;

}

function removeItem(key){
    const promise = fetch(`https://siit-buc3.firebaseio.com/onlineShop/products/${key}.json`, {method: 'DELETE'});

    promise
        .then(() => {
            getDataFromServer(displayTableOfProduse);
        })
        .catch(err => console.log(err));
}

function addItem(){
    const newProduct = {
        "title": document.getElementById('nume').value,
        "img": document.getElementById('url').value,
        "descriere": document.getElementById('reteta').value,
        "cantitate": document.getElementById('cantitate').value,
        "price": document.getElementById('pret').value
    };

    const promise = fetch(`https://siit-buc3.firebaseio.com/onlineShop/products/.json`, {method: 'POST', body: JSON.stringify(newProduct)});

    promise
        .then(() => {
            window.location.href = 'admin.html';
        })
        .catch(err => console.log(err));
}

function populateEdit(list, keys){
    document.getElementById('nume').value = listaProduse[getURLVars()['id']].title;
    document.getElementById('url').value = listaProduse[getURLVars()['id']].img;
    document.getElementById('reteta').value = listaProduse[getURLVars()['id']].descriere;
    document.getElementById('cantitate').value = listaProduse[getURLVars()['id']].cantitate;
    document.getElementById('pret').value = listaProduse[getURLVars()['id']].price;
    Keys = keys;
}

function editItem(key) {
    const newProduct = {
        "title": document.getElementById('nume').value,
        "img": document.getElementById('url').value,
        "descriere": document.getElementById('reteta').value,
        "cantitate": document.getElementById('cantitate').value,
        "price": document.getElementById('pret').value
    };

    const promise = fetch(`https://siit-buc3.firebaseio.com/onlineShop/products/${key}.json`, {method: 'PUT', body: JSON.stringify(newProduct)});

    promise
        .then(() => {
            window.location.href = 'admin.html';
        })
        .catch(err => console.log(err));
}