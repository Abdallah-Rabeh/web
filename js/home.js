"use strict"

let myform = document.querySelector("#StudentForm");
let inputs = document.querySelectorAll("input"); 
let tBody = document.querySelector("#TableStudents tbody"); 
let students =[];
let students_id = 1;
if(localStorage.getItem("students")===null){
    localStorage.setItem("students",JSON.stringify(students));
}else{
    students=JSON.parse(localStorage.getItem("students"));
    getstudents(students);    
}

if(localStorage.getItem("students_id")===null){
    localStorage.setItem("students_id",JSON.stringify(students_id));
}else{
    students_id =JSON.parse(localStorage.getItem("students_id"));
}

    myform.addEventListener('submit',function(e){
        e.preventDefault();
        
    let newstudent ={
        'id':students_id++,
        'FirstName':inputs[0].value,
        'LastName':inputs[1].value,
        'age':inputs[2].value

    }    
    students.push(newstudent);
    localStorage.setItem("students",JSON.stringify(students))

    
    tBody.innerHTML+=`
    <tr>
    <td>${newstudent.id}</td>
    <td>${newstudent.FirstName}</td>
    <td>${newstudent.LastName}</td>
    <td>${newstudent.age}</td>
    <td>
    <button class="btn btn-info" onclick="Editstudents(this)">Edit</button>
    <button class="btn btn-danger" onclick="Deletestudents(this)">Delete</button>
    </td>
    </tr>
    `;
    for (let input of inputs) {
        input.value='';
        
    }
});    
localStorage.setItem("students_id",JSON.stringify(students_id))

function getstudents (students){
for ( let student of students) {
    tBody.innerHTML+=`
    <tr>
    <td>${student.id}</td>
    <td>${student.FirstName}</td>
    <td>${student.LastName}</td>
    <td>${student.age}</td>
    <td>
    <button class="btn btn-info" onclick="Editstudents(this)">Edit</button>
    <button class="btn btn-danger" onclick="Deletestudents(this)">Delete</button>
    </td>
    </tr>
    `;
   
};
}
function Deletestudents(that){
    let myStudent= that.parentElement.parentElement;
    let Studentindex=students.findIndex( (student) =>{return student.id==myStudent.children[0].textcontent});
    students.splice(Studentindex, 1);
    console.log(students.splice(Studentindex, 1));
    localStorage.setItem("students",JSON.stringify(students));
    myStudent.remove();   
 };
 function Editstudents(that){


};


