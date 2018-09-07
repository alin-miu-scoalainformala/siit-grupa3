var items = [];
function addNewItem(event) {
    event.preventDefault();
    let itemName = document.querySelector('#new-item').value;
    items.push({
        name: itemName
    })
    drawTable();
}

function drawTable() {
    var tableRows = '';
    for(let i=0; i<items.length; i++){
        tableRows += `
            <tr>
                <td class="align-middle">${i+1}</td>
                <td class="align-middle item-name">${items[i].name}</td>
                <td class="text-center"><button class="btn btn-success" onclick="buyed(event)">Mark as buyed</button></td>
            </tr>
            
        `;
    }
    document.querySelector("form").reset();
    document.querySelector("table tbody").innerHTML = tableRows;
}

function buyed(element) {
    element.target.closest("tr").classList.add("buyed");
}


function sortItems(direction) {
    if(direction==='ASC'){
        items.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    } else {
        items.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x > y) {return -1;}
            if (x < y) {return 1;}
            return 0;
        });
    }
    drawTable();
}