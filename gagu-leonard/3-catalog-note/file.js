
var elevi = [];
var selectedIndex = -1;
var newDiv = document.querySelector('.toggleDiv');

newDiv.addEventListener('click', removeEntry);

function initial() {
    document.getElementById("divdisplay").innerHTML = "";
    if (localStorage.studentsRecord) {
        elevi = JSON.parse(localStorage.studentsRecord);
        for (var i = 0; i < elevi.length; i++) {
            addNewToggle();
        }
    }
}



function onAddPressed() {

    var nume = document.getElementById('takename').value
    var note = [];

    var elevObj = {
        name: nume,
        note: note,

    }
    if (selectedIndex === -1) {
        elevi.push(elevObj);
    } else {
        elevi.splice(selectedIndex, 1, elevObj);
    }

    localStorage.studentsRecord = JSON.stringify(elevi);
    addNewToggle();

}

function addNote(e) {
    /* 
    asa selectez idul unui obiect pe care dau click
     
    e = e|| window.event
    e = e.target || e.srcElement;
        var remID = e.id;
    */


    e = e || window.event
    e = e.target || e.srcElement;
    var remID = e.id;
    var nota = document.getElementById('inp' + remID).value;
    elevi[remID].note.push(nota);
    localStorage.studentsRecord = JSON.stringify(elevi);
    displayTbl(e)
}

/*function removeNote(e) {

    //remove an entry from the addressbook
         e = e || window.event
        e = e.target || e.srcElement;
        var remID = e.id;
        f = f|| window.event
        f = f.target || f.srcElement
        var idNote = f.id
        elevi(remID).note(idNote).splice(remID, 1);
        localStorage.studentsRecord = JSON.stringify(elevi);
        addNewToggle();
    }*/


function removeEntry(e) {

    if (e.target.classList.contains('delbutton')) {
        var remID = e.target.getAttribute("data-id");
        elevi.splice(remID, 1);
        localStorage.studentsRecord = JSON.stringify(elevi);
        addNewToggle();
    }
    displayTbl(e)
}

function displayTbl(e) {
    
    e = e || window.event
    e = e.target || e.srcElement;
    var remID = e.id;
    remID = remID.split('');
    remID = remID[remID.length-1]
    var tabb = document.querySelector('#divNote'+remID )
    var generatedNote = ''
    for (let i = 0; i < elevi[remID].note.length; i++) {
        generatedNote +=`
                         <span class="media"><li >${elevi[remID].note[i]} </li><button class = "x" id ="note${i}" onclick = "removeNote(${remID})">Sterge nota</button></span>
                         
                         <br>
                         ` 
       
        localStorage.studentsRecord = JSON.stringify(elevi);
    }
   
   tabb.innerHTML = generatedNote;
    var disTbl = document.querySelector('.displayTable')
    disTbl.style.display = 'block'
}

function removeNote(remID,e) {
    
    e = e || window.event
    e = e.target || e.srcElement;
    var remIDD = e.id;
    remIDD = remIDD.split('');
    remIDD = remIDD[remIDD.length-1]
    elevi[remID].note.splice(remIDD, 1);
    localStorage.studentsRecord = JSON.stringify(elevi);
    addNewToggle()
    displayTbl(e)
    }
   
function addNewToggle() {
    
    
    if (localStorage.studentsRecord === undefined) {
        localStorage.studentsRecord = '';
    } else {
        elevi = JSON.parse(localStorage.studentsRecord);

        newDiv.innerHTML = '';
        for (var n in elevi) {
            
            var avg = '';
            var sum = 0;
            for (let i = 0; i < elevi[n].note.length; i++) {
                if (elevi[n].note.length == 0) {
                    avg = ' ';
                } else {
                    sum += parseInt(elevi[n].note[i]);
                }
               
            }
            var avg = sum/elevi[n].note.length
            
            var str = '<div class="panel-group" id="accordion">';
            str += '<div class="panel panel-default">';
            str += '<div class="panel-heading">';
            str += '<h4 class="panel-title btn btn-info ">';
            str += '<div class="del"><a  href="#" class = "delbutton" data-id = "' + n + '" " >Sterge</a></div>';
            str += '<div class = "media">'
            str += '<a class = "nume" data-toggle="collapse" data-parent="#accordion" href="#collapse' + n + '" onclick = "displayTbl()">   <p id = "idd'+n+'">Nume: ' + elevi[n].name + '</p> </a>';
            str += '<p class = "avg" >Media ='+avg+ '</p>'
            str += '</div>'
            str += '</h4>';
            str += '</div>';
            str += ' <div id="collapse' + n + '" class="panel-collapse collapse pentrunote ">';
            str += '<div class="panel-body">';
            str += '<h4>Nume elev:';
            str += '<p id="nume">' + elevi[n].name + '</p>';
            str += ' </h4>';
            str += ' <input type="text"  id="inp' + n + '">'
            str += '  <button class= "inpu" id="' + n + '" onclick = "addNote()" ">Adauga note</button>';
            str += '<br>'
            str += '<ul id = "divNote'+n+'" class = "displayTable"></ul>'  
            str += ' </div>';
            str += ' </div>';
            str += ' </div>';
            str += '</div>';
            str += '<br>'
            newDiv.innerHTML += str;
            var avg = ''
        }
    }

}


 