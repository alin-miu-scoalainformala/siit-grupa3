// previn submit refresh, pastrez functionalitate cu Enter
document.querySelector("#add-student").addEventListener("click", function (e) { e.preventDefault(); });
document.querySelector(".add-grade").addEventListener("click", function (e) { e.preventDefault(); });

// variabile globale
let LIST_FROM_SERVER = "https://siit-bucuresti-756a0.firebaseio.com/student-list/.json";
let LIST_DIR = "https://siit-bucuresti-756a0.firebaseio.com/student-list/";
// let increment = 0;

// Constructorul principal de elevi 
function Student(name, grades) {
    this.name = name;
    this.grades = grades;
}

// calculator medie
function gradesAverage(gradesArray) {
    if (gradesArray) {
        let sum = 0;
        for (let i = 0; i < gradesArray.length; i++) {
            sum += Number(gradesArray[i]);
        }
        return Number(sum / gradesArray.length).toFixed(2);
    } else {
        return "Nicio nota";
    }
}

// functia care adauga un Elev nou in array-ul de Elevi
async function addStudent() {
    let studentName = document.getElementById('name').value;
    if (studentName) {
        let newStudent = new Student(studentName, []);
        await fetch(LIST_FROM_SERVER, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newStudent)
        });
        getStudentsFromServer()
    }
}

async function getStudentsFromServer() {
    let response = await fetch(LIST_FROM_SERVER);
    let studentList = await response.json();
    if (studentList) generateStudentList(studentList);
}

// functia care genereaza tabelul cu elevi
async function generateStudentList(array) {
    let body = document.getElementById('table-body');
    let generatedEntries = "";
    let arrayValues = Object.values(array);
    let arrayKeys = Object.keys(array);

    // daca exista ceva in arrayul cu Elevi, creeaza tabelul
    if (arrayValues.length > 0) {
        for (let i = 0; i < arrayValues.length; i++) {
            let average = await gradesAverage(arrayValues[i].grades);

            generatedEntries += `
                <tr class="student-row">
                    <td class="name">${arrayValues[i].name}</td>
                    <td class="average">${average}</td>
                    <td class="button" onclick="generateGradesList('${arrayKeys[i]}'); showGrades();"><button type="button" class="arata-note">Arată Notele</button></td>
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
async function generateGradesList(studentID) {
    let gradesBody = document.querySelector('.student-grade-list .table-body');
    let studentName = document.querySelector('.student-name');
    let gradeForm = document.querySelector('.add-grade');

    let response = await fetch(LIST_FROM_SERVER);
    let studentList = await response.json();
    let student = studentList[studentID];

    let generatedEntries = "";

    if (!student.grades) {
        generatedEntries = `
            <tr class="grade-row">
                <td class="grades">Nicio notă adaugată</td>
            </tr>
        `;
    } else {
        for (let i = 0; i < student.grades.length; i++) {
            generatedEntries += `
                <tr class="grade-row">
                    <td class="grades"><span>${student.grades[i]}</span><span class="delete" onclick="deleteGrade('${studentID}', ${i})">x</span></td>
                </tr>
            `;
        }
    }

    gradesBody.innerHTML = generatedEntries;
    studentName.innerHTML = student.name;
    gradeForm.innerHTML = `
        <label for="grade"></label><input type="number" id="grade" placeholder="adaugă nota..." autofocus>
        <button type="submit" id="add-grade" onclick="addGrade('${studentID}');">Adaugă Nota</button>
    `

    document.querySelector('.add-grade').reset();  //reseteaza forularul
}

async function deleteGrade(studentID, gradeID) {
    let response = await fetch(LIST_FROM_SERVER);
    let studentList = await response.json();
    let student = studentList[studentID];

    student.grades.splice(gradeID, 1);

    newStudent = new Student(student.name, student.grades);

    await fetch(`${LIST_DIR}${studentID}.json`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newStudent)
    });

    generateGradesList(studentID);
    getStudentsFromServer();
}

// functia care adauga note si arata eroare daca nu e intre 0-10
async function addGrade(studentID) {
    let grade = Number(document.getElementById('grade').value);
    let showError = document.querySelector('.error');

    let response = await fetch(LIST_FROM_SERVER);
    let studentList = await response.json();
    let student = studentList[studentID];

    if (grade && grade <= 10 && grade >= 0) {
        showError.style.opacity = "0";
        let newStudent;

        if (student.grades) {
            student.grades.push(grade);
            newStudent = new Student(student.name, student.grades);
        } else {
            let grades = [];
            grades.push(grade);
            newStudent = new Student(student.name, grades);
        }

        await fetch(`${LIST_DIR}${studentID}.json`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newStudent)
        });

        generateGradesList(studentID);
        getStudentsFromServer();
    } else {
        showError.style.opacity = "100";
    }
    document.getElementById('grade').value = "";
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
            let value1 = Number(grade[i].firstChild.innerHTML);
            let value2 = Number(grade[j].firstChild.innerHTML);

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
            let value1 = Number(grade[i].firstChild.innerHTML);
            let value2 = Number(grade[j].firstChild.innerHTML);

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

    mainWrapper.style.flex = "0 0 57%";
    showGrades.style.right = "0%";
}

// functia care ascunde div-ul cu lista de note
function hideGrades() {
    let showGrades = document.querySelector(".secondary-wrapper");
    let mainWrapper = document.querySelector(".wrapper");

    mainWrapper.style.flex = "0 0 90%";
    showGrades.style.right = "-100%";
}