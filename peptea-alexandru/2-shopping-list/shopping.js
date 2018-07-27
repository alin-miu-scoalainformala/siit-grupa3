var lista =[];



function adaugaProdus() {
	var item = document.getElementById("produs");
	
	var temp = {nume:item.value, cumparat:false };
	
	lista.push(temp);
	
	item.value = "";
	afiseaza();
	
	
}



function afiseaza(){
	var body = document.querySelector('tbody')
	var generatedBody = "";
	for(let i=0;i<lista.length;i++){
		if(lista[i].cumparat == true){
			generatedBody += 
			`<tr>
				<td><del>${lista[i].nume}</del> </td> 
				<td><button> Mark as buyed </button></td>
			</tr>`;
		}else{
			generatedBody += `<tr>
				<td>${lista[i].nume} </td> 
				<td><button onclick="marcheaza(${i});"> Mark as buyed </button></td>
			</tr>`;
		}
	}
	body.innerHTML = generatedBody;
}


function sorteaza(sortingDirection){
lista.sort(function(a,b) {
			if(sortingDirection == 'desc') {
				if(a.nume > b.nume) return -1;
				if(a.nume < b.nume) return 1;
				if(a.nume == b.nume) return 0;
			} else if(sortingDirection == 'asc') { 
				if(a.nume > b.nume) return 1;
				if(a.nume < b.nume) return -1;
				if(a.nume == b.nume) return 0;
			} 	
});
afiseaza();
}


function marcheaza(i){
	lista[i].cumparat = true;
	
afiseaza();
	
	
}



