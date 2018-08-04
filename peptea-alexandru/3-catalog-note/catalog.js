var lista = [];
//var noteLista = [];
var poz;
function Elev(nume, note) {
	this.nume = nume;
	this.note = note;
}


function adaugareElev () {
	var numele = document.getElementById("nume");
	var temp = new Elev(numele.value, []);
	lista.push(temp);
	numele.value = "";
	displayElev();
}

function displayElev(){
	var body = document.querySelector('tbody')
	var generatedBody = "";
	for(let i=0; i<lista.length;i++){
		if(lista[i].note.length==0){
	generatedBody += 
			`<tr>
				<td>${lista[i].nume}</td> 
				<td></td>
				<td><button onclick="afiseazaNotele(${i});">Afiseaza note</button></td>
			</tr>`;
		}else{
			generatedBody += `<tr>
				<td>${lista[i].nume}</td> 
				<td>${calcMedie(i)}</td>
				<td><button onclick="afiseazaNotele(${i});">Afiseaza note</button></td>
			</tr>`;
		}
	}
	body.innerHTML = generatedBody;
}

function sortareMedie () {
	
	
}

function calcMedie(i){
	var suma = 0;
	for(let j=0;j<lista[i].note.length; j++){
		suma= suma + lista[i].note[j];
		
	}	
	return suma / lista[i].note.length; 
}

 function ascundeNotele() { 
document.getElementById("container2").style.display = "none";
 }

function afiseazaNotele(i) {
	document.getElementById("container2").style.display = "block";
	
	document.getElementById("elevSpan").innerHTML = " " + lista[i].nume;
	poz = i;
 }


function adaugareNota () {
	var nota = document.getElementById("nota");
	var temp1 = nota.value;
	lista[poz].note.push(parseInt(temp1));
	nota.value = "";
	displayNota();
}


function displayNota(){
	
	var body1 = document.querySelector("#tbody1")
	var generatedBody1 = "";
	for(let i=0; i<lista[poz].note.length;i++){
		
	generatedBody1 += 
			`<tr>
				<td>${lista[poz].note[i]}</td> 
				
			</tr>`;
	}
	body1.innerHTML = generatedBody1;
	displayElev();
}

//1 trebuie sa adaug notele
// 2 

