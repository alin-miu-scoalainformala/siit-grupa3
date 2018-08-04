var students = [];
var currentStudent;

function addStudent(event) {
    event.preventDefault();
    let name = document.querySelector('#name').value;
    if (name) {
        students.push(
            {
                name: name,
                marks: [],
                average: ''
            }
        );
        document.querySelector("form").reset();
        drawStudentsTable();
    } else {
        alert("Please enter a name!")
    }
}

function addMark(event) {
    event.preventDefault();
    let mark = parseInt(document.querySelector('#marks').value);
    if (mark && mark <= 10){
        let student = students[currentStudent];
        student.marks.push(mark);
        student.average = calculateAverage(student.marks);
        drawMarksTable();
    } else {
        alert("Please enter a corect mark!");
    }
}

function drawStudentsTable() {
    let tableRows = '';
    for(let i=0; i<students.length; i++){
        tableRows += `
        <tr>
            <th scope="row">${i+1}</th>
            <td>${students[i].name}</td>
            <td>${(students[i].average)}</td>
            <td><button class="btn btn-secondary" onclick="showMarks(${i})">Vezi notele</button></td>
        </tr>`
    }
    document.querySelector(".students table tbody").innerHTML = tableRows;
}

function drawMarksTable() {
    let tableRows = '';
    let marks = students[currentStudent].marks;
    for(let i=0; i<marks.length; i++){
        tableRows += `
        <tr>
            <th scope="row">${i+1}</th>
            <th scope="row">${marks[i]}</th>
            
        </tr>`
    }
    document.querySelector(".marks table tbody").innerHTML = tableRows;
    drawStudentsTable();
}

function showMarks(index) {
    currentStudent = index;
    document.querySelector(".student-name").innerHTML = students[index].name;
    document.querySelector(".marks").classList.add("active");
    drawMarksTable();
}

function hideMarks() {
    document.querySelector(".marks").classList.remove("active");
}
function sortByAverage(direction) {
    if(direction==='ASC'){
        students.sort(function(a, b){
            var x = a.average;
            var y = b.average;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    } else {
        students.sort(function(a, b){
            var x = a.average;
            var y = b.average;
            if (x > y) {return -1;}
            if (x < y) {return 1;}
            return 0;
        });
    }
    drawStudentsTable();
}

function sortMarks(direction) {
    if(direction==='ASC'){
        students[currentStudent].marks.sort();
    }else {
        students[currentStudent].marks.reverse();
    }
    drawMarksTable();
}

function calculateAverage(array) {
    if(array.length > 0) {
        var sum = array.reduce(function (a, b) {
            return a + b;
        });
        return (sum / array.length).toFixed(2);
    }else {
        return '';
    }
}
drawStudentsTable();