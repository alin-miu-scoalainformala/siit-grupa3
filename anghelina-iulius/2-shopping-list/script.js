let items = [];

document.querySelector(".mainButton").addEventListener("click", function(e){ e.preventDefault(); })

function getListEntries() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let serverData = this.responseText;
            let serverDataAsJson = JSON.parse(serverData);

            items = []; // empty the array before gathering data from database to avoid duplicates 
            if (serverDataAsJson !== null) {
                let serverKeys = Object.keys(serverDataAsJson);
                idsEntriesFromServer = serverKeys;
                for (let i = 0; i < serverKeys.length; i++) {
                    let entry = serverDataAsJson[serverKeys[i]];
                    items.push(entry.name);
                }
            }
        }
    };
    xhttp.open("GET", "https://siit-bucuresti-756a0.firebaseio.com/shopping-list/.json", false);
    xhttp.send();

    showhideList();
    getItems(items);
}


function getItems(array) {
    let body = document.querySelector('table tbody');
    let generatedEntries = "";

    for (let i = 0; i < array.length; i++) {
        generatedEntries += `
            <tr>
                <td class="item item${i}">${array[i]}</td>
                <td class="mark" onclick="markAsBought(${i})">Mark As Bought</td>
            </tr>
        `;
    }
    body.innerHTML = generatedEntries;
}

function showhideList() {
    if (items.length > 0) {
        document.querySelector('.main').style.opacity = "100";
    } else {
        document.querySelector('.main').style.opacity = "0";
    }

    if (items.length > 1) {
        document.querySelector('.button-mark').style.opacity = "100";
    } else {
        document.querySelector('.button-mark').style.opacity = "0";
    }
}

function markAsBought(itemID) {
    
    for (let i = 0; i < items.length; i++) {
        
        if (i == itemID) {
            let item = document.querySelector(`.item${i}`);
            let marked = document.querySelectorAll('.mark')[i];

            if (!item.style.textDecoration) {
                item.style.textDecoration = `line-through`;
                marked.innerHTML = "Unmark";
            } else if (item.style.textDecoration == `none`) {
                item.style.textDecoration = `line-through`;
                marked.innerHTML = "Unmark";
            } else {
                item.style.textDecoration = `none`;
                marked.innerHTML = "Mark As Bought";
            }
        }
    }
}

function addItem(array) {
    let value = document.querySelector('form .input').value;

    let item = {
        "name": document.querySelector('form .input').value
    };

    let xhttp = new XMLHttpRequest();

    if (value) {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getListEntries();
                getItems(items);
            }
        };
        xhttp.open("POST", "https://siit-bucuresti-756a0.firebaseio.com/shopping-list/.json", false);
        xhttp.send(JSON.stringify(item));

        document.querySelector('.shoppingList').reset();
    }
}

function clearAll(array) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getListEntries();
            getItems(items);
        }
    };
    xhttp.open("DELETE", `https://siit-bucuresti-756a0.firebaseio.com/shopping-list/.json`, false);
    xhttp.send();


    getItems(items);
    showhideList();
    document.querySelector('.shoppingList').reset();
}

function markAll(array) {

    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            let item = document.querySelectorAll(".item");
            let marked = document.querySelectorAll('.mark')[i];

            if (!item[i].style.textDecoration) {
                item[i].style.textDecoration = `line-through`;
                marked.innerHTML = "Unmark";
            } else if (item[i].style.textDecoration == `none`) {
                item[i].style.textDecoration = `line-through`;
                marked.innerHTML = "Unmark";
            } 
        }
    }
}



function sortAsc(array) {
    array.sort(function(a,b) {
        if(a.toLowerCase() > b.toLowerCase()) return 1;
        if(a.toLowerCase() < b.toLowerCase()) return -1;
        if(a.toLowerCase() == b.toLowerCase()) return 0;
    });

    return array;
}

function sortDesc(array) {
    array.sort(function(a,b) {
        if(a.toLowerCase() > b.toLowerCase()) return -1;
        if(a.toLowerCase() < b.toLowerCase()) return 1;
        if(a.toLowerCase() == b.toLowerCase()) return 0;
    });

    return array;
}