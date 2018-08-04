document.querySelector("#add-student").addEventListener("click", function(e){ e.preventDefault(); }) // previne submit refresh, pastreaza functionalitate cu Enter
let studentArray = []; // array-ul in care urmeaza sa intre Elevii
let increment = 0;

// Constructorul principa de elevi 
function Student(id, name, grades)  {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.average = function() {
        if (this.grades.length > 0) {
            let sum = 0;
            for (let i = 0; i < this.grades.length; i++) {
                sum += Number(this.grades[i]);
            }
            return Number(sum / this.grades.length).toFixed(2);
        }
        return this.grades = [];
    }
}

// functia care adauga un Elev nou in array-ul de Elevi
function addStudent(array) {
    let studentName = document.getElementById('name').value;
    if (studentName) {
        array.push(new Student(increment, studentName, []));
        increment++;
    }
}

// functia care genereaza tabelul cu elevi
function generateStudentList(array) {
    let body = document.getElementById('table-body');
    let generatedEntries = "";
    // daca exista ceva in arrayul cu Elevi, creeaza tabelul
    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            generatedEntries += `
                <tr class="student-row">
                    <td class="name">${array[i].name}</td>
                    <td class="average">${array[i].average()}</td>
                    <td class="button" onclick="generateGradesList(${i});  showGrades();"><button type="button" class="arata-note">Arată Notele</button></td>
                </tr>
            `;
        }
    } else { // daca nu, call to action 
        generatedEntries = `
                <tr class="student-row">
                    <td class="name">Adaugă un nume!</td>
                </tr>
            `;
    }
    body.innerHTML = generatedEntries;
    document.querySelector('.add-student').reset(); //reseteaza forularul
}

// functia care genereaza lista de note
function generateGradesList(id) {
    let student = studentArray[id];
    let gradesBody = document.querySelector('.student-grade-list .table-body');
    let studentName = document.querySelector('.student-name');
    let gradeForm = document.querySelector('.add-grade');
    let generatedEntries = "";
    // daca exista ceva in arrayul cu note, creeaza tabelul
    if (student.grades.length > 0) {
        for (let i = 0; i < student.grades.length; i++) {        
            generatedEntries += `
                <tr class="grade-row">
                    <td class="grades">${student.grades[i]}</td>
                </tr>
            `;
        }
    } else { // daca nu, arata ca nu avem nicio nota
        generatedEntries = `
                <tr class="grade-row">
                    <td class="grades">Nicio notă adaugată</td>
                </tr>
            `;
    }

    gradesBody.innerHTML = generatedEntries;
    studentName.innerHTML = student.name;
    gradeForm.innerHTML = `
        <label for="grade"></label><input type="number" id="grade" placeholder="adaugă nota..." autofocus>
        <button type="submit" id="add-grade" href="#" onclick="addGrade(${id}); generateGradesList(${id}); generateStudentList(studentArray)">Adaugă Nota</button>
    `
   
    // document.querySelector('#add-grade').addEventListener('click', function(e){ e.preventDefault(); }) // previne submit refresh, pastreaza functionalitate cu Enter
    document.querySelector('.add-grade').reset();  //reseteaza forularul
}

// functia care adauga note si arata eroare daca nu e intre 0-10
function addGrade(id) {
    let student = studentArray[id];
    let grade = document.getElementById('grade').value;
    let showError = document.querySelector('.error');

    if (grade && grade <= 10 && grade >=0) {
        showError.style.opacity = "0";
        student.grades.push(grade);
    } else {
        showError.style.opacity = "100";
    }
    
}

// functii de sortare
function averageSortAsc() {
    let tableRow = document.querySelectorAll('.student-row');
    let average = document.querySelectorAll('.average');

    for (let i = 0; i < tableRow.length; i++) {
        for (let j = i; j < tableRow.length; j++) {
            let value1 = Number(average[i].innerHTML);
            let value2 = Number(average[j].innerHTML);
            
            if (value1 > value2) {
                let temp = tableRow[i].innerHTML;
                tableRow[i].innerHTML = tableRow[j].innerHTML;
                tableRow[j].innerHTML = temp;
            }
        }
    }
}

function averageSortDesc() {
    let tableRow = document.querySelectorAll('.student-row');
    let average = document.querySelectorAll('.average');

    for (let i = 0; i < tableRow.length; i++) {
        for (let j = i; j < tableRow.length; j++) {
            let value1 = Number(average[i].innerHTML);
            let value2 = Number(average[j].innerHTML);
            
            if (value1 < value2) {
                let temp = tableRow[i].innerHTML;
                tableRow[i].innerHTML = tableRow[j].innerHTML;
                tableRow[j].innerHTML = temp;
            }
        }
    }
}

function gradeSortAsc() {
    let tableRow = document.querySelectorAll('.grade-row');
    let grade = document.querySelectorAll('.grades');

    for (let i = 0; i < tableRow.length; i++) {
        for (let j = i; j < tableRow.length; j++) {
            let value1 = Number(grade[i].innerHTML);
            let value2 = Number(grade[j].innerHTML);
            
            if (value1 > value2) {
                let temp = tableRow[i].innerHTML;
                tableRow[i].innerHTML = tableRow[j].innerHTML;
                tableRow[j].innerHTML = temp;
            }
        }
    }
}

function gradeSortDesc() {
    let tableRow = document.querySelectorAll('.grade-row');
    let grade = document.querySelectorAll('.grades');

    for (let i = 0; i < tableRow.length; i++) {
        for (let j = i; j < tableRow.length; j++) {
            let value1 = Number(grade[i].innerHTML);
            let value2 = Number(grade[j].innerHTML);
            
            if (value1 < value2) {
                let temp = tableRow[i].innerHTML;
                tableRow[i].innerHTML = tableRow[j].innerHTML;
                tableRow[j].innerHTML = temp;
            }
        }
    }
}

// functia care arata div-ul cu lista de note
function showGrades() {
    let showGrades = document.querySelector(".secondary-wrapper");
    let mainWrapper = document.querySelector(".wrapper");

    mainWrapper.style.flex = "0 0 55%";
    showGrades.style.right = "0%";
}

// functia care ascunde div-ul cu lista de note
function hideGrades() {
    let showGrades = document.querySelector(".secondary-wrapper");
    let mainWrapper = document.querySelector(".wrapper");

    mainWrapper.style.flex = "0 0 90%";
    showGrades.style.right = "-100%";
}