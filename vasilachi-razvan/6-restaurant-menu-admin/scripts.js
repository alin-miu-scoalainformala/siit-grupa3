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

var select = document.querySelector.bind(document);

function getMenu() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //console.log(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "https://kfc-store.firebaseio.com/.json", true);
    xhttp.send();
}

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
            // console.log(JSON.parse(this.responseText));
        }
    };
    xhttp.open("POST", `https://kfc-store.firebaseio.com/meniu/${product_category}/.json`, true);
    xhttp.send(JSON.stringify((newProduct)));
}

function uploadFile(event) {
    event.preventDefault();
    // Get file
    var file = select("#image").files[0];

    // Create a storage ref
    var storageRef = firebase.storage().ref('images/' + file.name);

    // Upload file
    var task = storageRef.put(file);

    task.on('state_changed',
        function progress(snapshot){

        },
        function error(err) {

        },
        function complete() {
            console.log(task.snapshot.downloadURL);
        }
    );
}