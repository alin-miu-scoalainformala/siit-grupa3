function drawLista(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("loading").style.display="none";
            listaProduse= JSON.parse(this.responseText);
            
            var tabel=document.querySelector("#listaProduse tbody");
            var str="";
            for(var i in listaProduse.menu){
                str += `<tr>
                    <td class="image"> <img  src="${listaProduse.menu[i].imagine}" alt="no image"/> </td>
                    <td> <div class="denumire"> ${listaProduse.menu[i].nume}</div> 
                         <div> ${listaProduse.menu[i].ingrediente}</div>
                    </td>
                    <td> <a href="edit.html?id=${i}" class="modifica">Modifica</a></td>
                    <td> <a href="delete.html?id=${i}" class="detalii">Sterge</a></td>
                </tr>`;
            }
            console.log(str);
            tabel.innerHTML=str;
        }
    };                
    xhttp.open("GET", "https://restaurant-meniu-admin.firebaseio.com/.json", true);
    xhttp.send();
    document.getElementById("loading").style.display="";
}
