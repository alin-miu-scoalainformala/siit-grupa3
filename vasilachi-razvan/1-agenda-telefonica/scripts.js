var agenda = [];
var updateIndex;

function saveContact(event) {
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let telephone = document.querySelector('#telephone').value;
    if (name && telephone) {
        if(updateIndex || updateIndex===0){
            agenda[updateIndex].name = name;
            agenda[updateIndex].telephone = telephone;
            document.querySelector('#submit-button').innerHTML = 'Add New Contact';
            updateIndex = '';
        }else {
            agenda.push(
                {
                    name: name,
                    telephone: telephone
                }
            );
        }
        document.querySelector("form").reset();
        drawTable();
    } else {
        alert("Please enter a name and a telephone number!")
    }

}

function edit(index) {
    updateIndex = index;
    document.querySelector('#name').value = agenda[index].name;
    document.querySelector('#telephone').value = agenda[index].telephone;
    document.querySelector('#submit-button').innerHTML = 'Update contact';
}

function remove(index) {
    agenda.splice(index);
    drawTable();
}

function drawTable() {
    let tableRows = '';
    for(let i=0; i<agenda.length; i++){
        tableRows += `
        <tr>
            <th scope="row">${i+1}</th>
            <td>${agenda[i].name}</td>
            <td>${agenda[i].telephone}</td>
            <td><i class="fas fa-edit edit" onclick="edit(${i})"></i></td>
            <td><i class="far fa-trash-alt" onclick="remove(${i})"></i></td>
        </tr>`
    }
    document.querySelector("table tbody").innerHTML = tableRows;
}

