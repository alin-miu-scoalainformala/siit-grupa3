async function getAllProductsFromServer() {
    var products = await http.GET(ALLPRODUCTS_URI);
    return products;
}

async function getProductFromServer(idProduct) {
    var details = await http.GET(PRODUCT_URI + idProduct + '.json');
    return details;
}

async function displayProducts(productsAsPromise) {
    var products = await productsAsPromise;
    setTimeout(() => {
        initHTML();
        Object.keys(products).forEach(idProduct => {
            if(products[idProduct] != null){
                document.querySelector('tbody').innerHTML += generateHTMLForProduct(idProduct, products[idProduct]);
            }
        });
    }, 500);
}

function generateHTMLForProduct(idProduct, product){
    return `<tr>
                <td style="width: 1%;"><img src="${product.img}" style="width: 100px; height: 50px;"></td>
                <td style="width: 10%;"><a style="float: left;" href="edit.html?id=${idProduct}">${product.title}</a></td>
                <td style="width: 1%;">${product.price} Lei</td>
                <td style="width: 1%;"><span style="float: right;">${product.cantitate}</span></td>
                <td style="width: 1%;"><a href="#" data-toggle="modal" class="remove" data-id="${idProduct}">Remove</a></td>
            </tr>`;
}

function initHTML() {
    document.getElementById('main').innerHTML = `<div class="card box-shadow" id="all">
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
}

async function removeItem(id){
    await http.DELETE(PRODUCT_URI + id + '.json');
    displayProducts(getAllProductsFromServer());
}

async function addItem(){
    const newProduct = {
        "title": document.getElementById('nume').value,
        "img": document.getElementById('url').value,
        "descriere": document.getElementById('reteta').value,
        "cantitate": document.getElementById('cantitate').value,
        "price": document.getElementById('pret').value
    }
    
    await http.POST(ALLPRODUCTS_URI, newProduct);

    window.location.href = 'admin.html'
}

async function populateEditForm(idProduct){
    var product = await http.GETWITHOUTANIMATION(PRODUCT_URI + idProduct + SUFFIX);
    document.getElementById('nume').value = product.title;
    document.getElementById('url').value = product.img;
    document.getElementById('reteta').value = product.descriere;
    document.getElementById('cantitate').value = product.cantitate;
    document.getElementById('pret').value = product.price;
}

async function applyEditedItemOnServer(idProduct){
    const updatedProduct = {
        "title": document.getElementById('nume').value,
        "img": document.getElementById('url').value,
        "descriere": document.getElementById('reteta').value,
        "cantitate": document.getElementById('cantitate').value,
        "price": document.getElementById('pret').value
    };

    await http.PUT(PRODUCT_URI + idProduct + SUFFIX, updatedProduct);
    window.location.href = 'admin.html'
}


