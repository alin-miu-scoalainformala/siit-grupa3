var listElevi = [];
var index_elev;
var note = [];

function Elev(nume, medie){
    this.nume = nume;
    this.medie = medie;
}

function display(){
    let body = document.querySelector('#left table tbody');
    let generatedTxt = "";
    for (let i = 0; i < listElevi.length; i++) {
        
        if(listElevi[i].medie !== 0)
            generatedTxt += `
                <tr>
                    <td>${listElevi[i].nume}</td>
                    <td>${listElevi[i].medie}</td>
                    <td><button onclick="showNote(${i});">Vezi notele</button></td>
                </tr>
            `;
        else
            generatedTxt += `
                    <tr>
                        <td>${listElevi[i].nume}</td>
                        <td></td>
                        <td><button onclick="showNote(${i});">Vezi notele</button></td>
                    </tr>
                `;
    }
    body.innerHTML = generatedTxt;
}

function addElev(){
    let nume = document.getElementById('nume');
    let newElev = new Elev(nume.value, 0);

    listElevi.push(newElev);
    nume.value = "";

    display();
}

function showNote(index){
    let left = document.getElementById('left');
    let right = document.getElementById('right');

    left.style.width = '51.01%';

    right.style.display = 'block';

    let right_name = document.getElementById('elev');
    right_name.innerHTML = listElevi[index].nume;
    note = [];

    document.querySelector('#right table tbody').innerHTML = "";
    index_elev = index;
}

function unshowNote(){
    let left = document.getElementById('left');
    let right = document.getElementById('right');

    left.style.width = '99%';
    right.style.display = 'none';
}

function displayNote(){
    let body = document.querySelector('#right table tbody');
    let generatedTxt = "";
    for (let i = 0; i < note.length;i++) {
        generatedTxt += `
            <tr>
                <td>${note[i]}</td>
            </tr>
        `;

    }
    body.innerHTML = generatedTxt;
}

function adaugaNota(){
    let nota = document.getElementById('nota');
    let body = document.querySelector('#right table tbody');
    var count = 1;

    note.push(parseInt(nota.value));

    displayNote();
    
    nota.value = "";

    listElevi[index_elev].medie = 0;

    calcMedie();
    display();
}

function calcMedie(){
    
    for(let i = 0; i < note.length; i++){
        listElevi[index_elev].medie += note[i];
    }
    
    listElevi[index_elev].medie /= note.length;
}

function sortByMedie(sortingDir) {
    listElevi.sort(function (a, b) {
        if (sortingDir == 'asc') {
            if (a.medie > b.medie) return 1;
            if (a.medie == b.medie) return 0;
            if (a.medie < b.medie) return -1;
        } else {
            if (a.medie > b.medie) return -1;
            if (a.medie == b.medie) return 0;
            if (a.medie < b.medie) return 1;
        }
    });
    display(listElevi);
}

function sortByNote(sortingDir) {
    note.sort(function (a, b) {
        if (sortingDir == 'asc') {
            if (a > b) return 1;
            if (a == b) return 0;
            if (a < b) return -1;
        } else {
            if (a > b) return -1;
            if (a == b) return 0;
            if (a < b) return 1;
        }
    });
    displayNote();
}