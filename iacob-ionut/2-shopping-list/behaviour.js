var lista = [];
var listaProduseCumparate = [];
function addProduct() {
    var product = document.querySelector('input').value;
    document.getElementById('itemsAction').style.display = "block";
   //document.getElementById('input').value = "";
    lista.push(product);
    displayItems();
    /*
    if(product) {
        var body = document.getElementById('body');
        document.getElementById('itemsAction').style.display = "block";
        var addProduct = `
        <tr>
            <td class="${cssItem}">
                ${item}
            </td>
            <td>
                <button onclick="markAsBuy('${item}')">Mark as buy</button>
            </td>
        </tr>
        `;
        body.innerHTML = body.innerHTML + addProduct;
    
        product.value = '';
        document.getElementById("error").style.opacity = "0";
    } else {
        document.getElementById("error").style.opacity = "100";
    }*/
   
}

function displayItems() {
    var generatedHtml = ``;
    for (var i = 0; i < lista.length; i++) {
        var item = lista[i];
        var cssItem = '';
        if (listaProduseCumparate.includes(item)) {
            cssItem = "bought";
        }
        generatedHtml += `
        <tr>
            <td class="${cssItem}">
                ${item}
            </td>
            <td>
                <button onclick="markAsBuy('${item}')">Mark as bought</button>
            </td>
        </tr>
        `;
    }
    document.getElementById('body').innerHTML = generatedHtml;
}

function markAsBuy(produs) {
    listaProduseCumparate.push(produs);
    displayItems();
}



function sortAsc() {
    lista.sort();
    displayItems();

}

function sortDesc() {
    lista.sort();
    lista.reverse();
    displayItems();

}

