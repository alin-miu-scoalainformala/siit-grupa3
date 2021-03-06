// Initialize Firebase
var config = {
    apiKey: "AIzaSyA7E7-48yYINN54OsVWxjEdvFBYhFXnZ8U",
    authDomain: "kfc-store.firebaseapp.com",
    databaseURL: "https://kfc-store.firebaseio.com",
    projectId: "kfc-store",
    storageBucket: "kfc-store.appspot.com",
    messagingSenderId: "425360991844"
};
firebase.initializeApp(config);

$('#addNewProduct').on('hidden.bs.modal', function (e) {
    $(this).find('form')[0].reset();
})

var select = document.querySelector.bind(document);
var database = '';
var edit = false;

function getMenu() {
    let xhttp = new XMLHttpRequest();
    let generatedBody = '';
    let i = 0;
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            database = JSON.parse(this.responseText);
            for(let catKey in database.meniu){
                for(let productKey in database.meniu[catKey]){
                    product         = database.meniu[catKey][productKey];
                    generatedBody   += `
                        <tr>
                            <td>${++i}</td>
                            <td>${product.nume}</td>
                            <td>${catKey}</td>
                            <td>${product.descriere}</td>
                            <td>${product.pret}</td>
                            <td><button class="btn btn-primary" onclick="showEditModal('${catKey}','${productKey}')"><i class="fas fa-edit"></i></button></td>
                            <td><button class="btn btn-danger" onclick="deleteProduct('${catKey}','${productKey}')"><i class="fas fa-trash"></i></button></td>
                    `;

                }

            }
        select('.products-table tbody').innerHTML = generatedBody;
        }
    };
    xhttp.open("GET", "https://kfc-store.firebaseio.com/.json", true);
    xhttp.send();
}

// ADD PRODUCT
function addProduct(event){
    event.preventDefault();
    let newProduct = {
        "nume"        : select('#product-name').value,
        "categorie"   : select('#product-category').value,
        "descriere"   : select('#product-description').value,
        "pret"        : select('#product-price').value,
        "stock"       : select('#product-stock').checked
    };
    let product_category = select('#product-category').value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            $('#addNewProduct').modal('toggle');
            getMenu();
        }
    };
    xhttp.open("POST", `https://kfc-store.firebaseio.com/meniu/${product_category}/.json`, true);
    xhttp.send(JSON.stringify((newProduct)));
}

// EDIT PRODUCT
function showEditModal(category,id) {
    edit = {
        'category': category,
        'id': id
    }

    let currentProduct = database.meniu[edit.category][edit.id];
    select('#product-name').value           = currentProduct.nume;
    select('#product-category').value       = currentProduct.categorie;
    select('#product-description').value    = currentProduct.descriere;
    select('#product-price').value          = currentProduct.pret;
    select('#product-stock').value          = currentProduct.stock;

    $('#addNewProduct').modal('show');
}
function editProduct(event){
    event.preventDefault();

    let editedProduct = {
        "nume"        : select('#product-name').value,
        "categorie"   : select('#product-category').value,
        "descriere"   : select('#product-description').value,
        "pret"        : select('#product-price').value,
        "stock"       : select('#product-stock').checked
    };

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            edit = false;
            $('#addNewProduct').modal('toggle');
            getMenu();
        }
    };
    xhttp.open("PATCH", `https://kfc-store.firebaseio.com/meniu/${edit.category}/${edit.id}.json`, true);
    xhttp.send(JSON.stringify((editedProduct)));
}

// DELETE PRODUCT
function deleteProduct(category, id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getMenu();
        };
    }
    xhttp.open("DELETE", `https://kfc-store.firebaseio.com/meniu/${category}/${id}.json`, true);
    xhttp.send();
}

getMenu();
// function uploadFile(event) {
//     event.preventDefault();
//     // Get file
//     var file = select("#image").files[0];
//
//     // Create a storage ref
//     var storageRef = firebase.storage().ref('images/' + file.name);
//
//     // Upload file
//     var task = storageRef.put(file);
//
//     task.on('state_changed',
//         function progress(snapshot){
//
//         },
//         function error(err) {
//
//         },
//         function complete() {
//             console.log(task.snapshot.downloadURL);
//         }
//     );
// }