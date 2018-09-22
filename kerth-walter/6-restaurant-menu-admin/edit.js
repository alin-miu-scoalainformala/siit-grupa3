var listaProduse=[];			
var indexModificat=-1;

function modificaPreparat(form, event){
event.preventDefault();      

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location="index.html";
        }
    };
    
    xhttp.open("PUT", "https://restaurant-meniu-admin.firebaseio.com/menu/"+window.location.search.substring(4)+".json", true);
    xhttp.send(JSON.stringify({
        imagine: form.querySelector("[name=imagine]").value,
        ingrediente: form.querySelector("[name=ingrediente]").value,
        nume: form.querySelector("[name=nume]").value,
        reteta: form.querySelector("[name=reteta]").value,
    }));

}

function drawLista(){
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {

produs= JSON.parse(this.responseText);
document.querySelector("form [name=imagine]").value=produs.imagine;
document.querySelector("form [name=ingrediente]").value=produs.ingrediente;
document.querySelector("form [name=nume]").value=produs.nume;
document.querySelector("form [name=reteta").value=produs.reteta;	
}
};
xhttp.open("GET", "https://restaurant-meniu-admin.firebaseio.com/menu/"+window.location.search.substring(4)+".json", true);
xhttp.send();
}
