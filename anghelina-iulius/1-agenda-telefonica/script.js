let phoneBook = [];
let currentIndex = null;

function getPhoneBookEntries() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let serverData = this.responseText;
            let serverDataAsJson = JSON.parse(serverData);

            phoneBook = []; // empty the array before gathering data from database to avoid duplicates 
            if (serverDataAsJson !== null) {
                let serverKeys = Object.keys(serverDataAsJson);
                idsEntriesFromServer = serverKeys;
                for (let i = 0; i < serverKeys.length; i++) {
                    let entry = serverDataAsJson[serverKeys[i]];
                    phoneBook.push(entry);
                }
            }
        }
    };
    xhttp.open("GET", "https://siit-bucuresti-756a0.firebaseio.com/phone-book/.json", false);
    xhttp.send();

    showContactsTable();
}

function displayContacts(list) {
    var body = document.querySelector('table tbody');
    let generatedEntries = "";

    for (let i = 0; i < list.length; i++) {
        let idClient = idsEntriesFromServer[i]
        generatedEntries += `
            <tr>
                <td class="sortable nume">${list[i].name}</td>
                <td class="sortable prenume">${list[i].phone}</td>
                <td class="clickable modify" onclick="modifyEntry('${idClient}')">Modify</td>
                <td class="clickable delete entry${idClient}" onclick="deleteEntry('${idClient}')">Delete</td>
            </tr>
        `;
    }

    body.innerHTML = generatedEntries;
}

function addContact() {
    let name = document.getElementById("nume").value;
    let number = document.getElementById("number").value;

    let contact = {
        "name": document.getElementById("nume").value,
        "phone": document.getElementById("number").value
    };

    let xhttp = new XMLHttpRequest();

    if (name && number) {
        if (currentIndex) { // modify selected -- PATCH

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    getPhoneBookEntries();
                    displayContacts(phoneBook);
                }
            };
            xhttp.open("PATCH", `https://siit-bucuresti-756a0.firebaseio.com/phone-book/${currentIndex}.json`, false);
            xhttp.send(JSON.stringify(contact));

            currentIndex = null;

        } else { // add new contact -- POST
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    getPhoneBookEntries();
                    displayContacts(phoneBook);
                }
            };
            xhttp.open("POST", "https://siit-bucuresti-756a0.firebaseio.com/phone-book/.json", false);
            xhttp.send(JSON.stringify(contact));
        }
    }
    document.querySelector(".button").value = "Add Contact";
    document.querySelector(".button").style.backgroundColor = "firebrick";
    document.querySelector(".main-input").reset();
}

function showContactsTable() {
    if (phoneBook.length > 0) {
        document.querySelector(".contacts").style.opacity = "100";
        document.querySelector(".thead").style.display = "table-header-group";
        document.querySelector(".clearbutton").style.opacity = "0";
        if (phoneBook.length > 1) {
            document.querySelector(".clearbutton").style.opacity = "100";
        }
    } else {
        document.querySelector(".contacts").style.opacity = "0";
        document.querySelector(".thead").style.display = "none";
        document.querySelector(".clearbutton").style.opacity = "0";
    }
}

document.querySelector('#number').addEventListener('keydown', pressEnter);
function pressEnter(e) {
    if (e.keyCode == 13) {
        addContact(phoneBook);
        displayContacts(phoneBook);
        showContactsTable();
    }
}

function deleteEntry(currentID) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getPhoneBookEntries();
            displayContacts(phoneBook);
        }
    };
    xhttp.open("DELETE", `https://siit-bucuresti-756a0.firebaseio.com/phone-book/${currentID}.json`, false);
    xhttp.send();

    displayContacts(phoneBook);
    showContactsTable();
}

function modifyEntry(currentID) {
    document.querySelector(".button").value = "Modify";
    document.querySelector(".button").style.backgroundColor = "#22B24B";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            currentEntry = JSON.parse(this.responseText);
            document.querySelector("#nume").value = currentEntry.name;
            document.querySelector("#number").value = currentEntry.phone;
            currentIndex = currentID;
        }
    };

    xhttp.open("GET", `https://siit-bucuresti-756a0.firebaseio.com/phone-book/${currentID}.json`, false);
    xhttp.send();

    document.querySelector(`.entry${currentID}`).style.display = "none";
}

function clearAll() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getPhoneBookEntries();
            displayContacts(phoneBook);
        }
    };
    xhttp.open("DELETE", `https://siit-bucuresti-756a0.firebaseio.com/phone-book/.json`, false);
    xhttp.send();

    displayContacts(phoneBook);
    showContactsTable();
    document.querySelector(".button").value = "Add Contact";
    document.querySelector(".button").style.backgroundColor = "firebrick";
    document.querySelector(".main-input").reset();
}
