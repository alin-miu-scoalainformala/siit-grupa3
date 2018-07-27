 
var MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";
var MENU_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/";
var listaMeniu = [];
var listaChei = [];

function afiseaza(listaProduse, listaKeys) {
	var input = document.getElementById("continut");
	var generatedBody = "";
	
	for(let i=0; i<listaProduse.length; i++) {
		const key = listaKeys[i];
		generatedBody +=
			`
			<div class="food">

					<div class="imagine">
						<img src="${listaProduse[i].imagine}" class="imagineProdus">
					</div>

					<div class="detalii">
						<h3>${listaProduse[i].nume}</h3>
						<p class="reteta">${listaProduse[i].ingrediente}</p>
						
					</div>

					<div class="detaliiProdus">
						<a href="descriere.html?id=${key}"><input type="button" class="butonProdus" value="DETALII"></a>
					</div>

				</div> <br> <br> <br> <br> <br> <br> <br> <br> <br>
			`
	}  input.innerHTML = generatedBody;
	
}

function getDataFromServer (){
	var promise = fetch(MENU_SERVER_URL, {method: 'GET'}).then(res => res.json());
	
	promise
		.then(res => {
			listaMeniu = Object.values(res.menu);
			listaChei = Object.keys(res.menu);
		
			console.log(listaMeniu);
		
			afiseaza(listaMeniu, listaChei);
		
		})
		.catch(err => console.log(err));
}

function cautaElementele() {
	var obiectCautat = document.getElementById("input");
	var listaCurenta = [];
	var listaCheieCurenta = [];
	
	for(let i=0; i<listaMeniu.length;i++) {
		if(listaMeniu[i].ingrediente.includes(obiectCautat.value)) {
			listaCurenta.push(listaMeniu[i]);
			listaCheieCurenta.push(listaChei[i]);
			
		}
		
	} afiseaza(listaCurenta, listaCheieCurenta);
}
	
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getDataFromServer2 (id) {
	var promise = fetch(MENU_ITEM_SERVER_URL + id + ".json", {method: 'GET'}).then(res => res.json());
	promise
		.then(res => {
		displayDescriere(res)
	})
}


function displayDescriere (object) {
	let imagineDescriere = document.getElementById('ImagineProdus');
	let titluDescriere = document.getElementById('h3Produs');
	let RetetaDescriere = document.getElementById('pReteta');
	let ingredienteDescriere = document.getElementById('pIngredinte');
	
	imagineDescriere.src = object.imagine;
	titluDescriere.innerHTML = object.nume;
	RetetaDescriere.innerHTML = object.reteta;
	ingredienteDescriere.innerHTML = object.ingrediente;
}
