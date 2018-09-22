function drawLista() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            detaliuProduse = JSON.parse(this.responseText);
            var tabel = document.querySelector("#detaliiProduse tbody");
            var str = "";
            document.getElementById("image").src = detaliuProduse.imagine;
            document.getElementById("nume").innerHTML = detaliuProduse.nume;
            document.getElementById("ingrediente").innerHTML = detaliuProduse.ingrediente;
            document.getElementById("reteta").innerHTML = detaliuProduse.reteta;
        }
    };
    xhttp.open("GET", "https://restaurant-menu-v1.firebaseio.com/menu/" + window.location.search.substring(4) + ".json", true);
    xhttp.send();
}
