
function drawLista() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            listaProduse = JSON.parse(this.responseText);
            var tabel = document.querySelector("#listaProduse tbody");
            var str = "";
            for (var i in listaProduse.menu) {
                if (document.querySelector("#text_box_1").value !== "" && listaProduse.menu[i].ingrediente.indexOf(document.querySelector("#text_box_1").value) === -1) {
                    continue;
                }
                str += `<tr>
                        <td class="image"> <img  src="${listaProduse.menu[i].imagine}" alt="no image"/> </td>
                        <td> <div class="denumire"> ${listaProduse.menu[i].nume}</div> 
                             <div> ${listaProduse.menu[i].ingrediente}</div>
                        </td>
                        <td> <a href="detalii preparat.html?id=${i}" class="detalii">Detalii</a></td>
                    </tr>`;
            }
            console.log(str);
            tabel.innerHTML = str;
        }
    };
    xhttp.open("GET", "https://restaurant-menu-v1.firebaseio.com/.json", true);
    xhttp.send();
}