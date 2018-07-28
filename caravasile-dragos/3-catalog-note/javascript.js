var elevi = [];
var note = [];
var medie = [];
var indexElev;

function adElev() {
    var nume = document.getElementById("numeelev").value;
    elevi.push(nume);
    note.push([]);
    medie.push(0);
    document.getElementById("numeelev").value = "";
}

function afisareElevi() {
    var htmlElevi = `
        <table>
            <tr>
                <th>Nume elev</th>
                <th>Medie note</th>
                <th></th>
            </tr>
    `;
    for (var i = 0; i < elevi.length; i++) {
        htmlElevi = htmlElevi + `
            <tr>
                <td>${elevi[i]}</td>
                <td>${medie[i]}</td>
                <td>
                    <button onclick="indexElev=${i}; afisareNote();">Vezi notele</button>
                </td>
            </tr>
        `;
    }
    htmlElevi = htmlElevi + "</table>"
    document.getElementById("lista_elevi").innerHTML = htmlElevi;
}


function afisareNote() {

    document.getElementById("pnume_elev").innerHTML = elevi[indexElev];
    document.getElementById("noteeleviwrap").style.display = "block";

    //pas 1 - preluam notele pe care le are elevul
    var noteElev = note[indexElev];

    //pas 2 - compunem html-ul cu notele elevului
    var htmlNote = "";
    for (var i = 0; i < noteElev.length; i++) {
        htmlNote = htmlNote + noteElev[i] + "<br/>";
    }

    //pas 3 - afisam html-ul cu notele elevului in ecran
    document.getElementById("listanote").innerHTML = htmlNote;
}
    function adaugareNota() {
        var nota = document.getElementById("notaelev").value; //nota introdusa de utilizator in ecran

        //PAS 1 - preiau lista de note exisente din matrice 
        var noteElev = note[indexElev];

        //PAS 2 - adaug nota noua in lista
        noteElev.push(nota);

        document.getElementById("notaelev").value = "";
    }



function ascundenota() {
    document.getElementById("noteeleviwrap").style.display = "none";
}

function sumaNoteElev() {
    var noteElev = note[indexElev];
    var sum = 0;
    for (var i = 0; i < noteElev.length; i++) {
        sum = sum + parseInt(noteElev[i]);
    }
    return sum;
}

function medieNoteElev() {
    var noteElev = note[indexElev];

    var sumaNote = sumaNoteElev();
    var nrNote = noteElev.length;

    var mediaNotelor = sumaNote / nrNote;

    return mediaNotelor;
}