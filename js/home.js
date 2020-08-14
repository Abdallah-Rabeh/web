"use strict"
let myform = document.querySelector("#StudentForm");
let inputs = document.querySelectorAll("input"); 
let tBody = document.querySelector("#TableStudents tbody"); 
let myBoutton=document.querySelector("#StudentForm button[type='submit']");
let students =[];
let students_id = 1;
if(localStorage.getItem("students")===null){
    localStorage.setItem("students",JSON.stringify(students));
}else{
    students =JSON.parse(localStorage.getItem("students"));
    getstudents(students);    
}
if(localStorage.getItem("students_id")===null){
    localStorage.setItem("students_id",JSON.stringify(students_id));
}else{
    students_id =JSON.parse(localStorage.getItem("students_id"));
}
    myform.addEventListener('submit',function(e){
        e.preventDefault();  
        if(myform.getAttribute('type-of-form')=='add'){
            let newstudent ={
                'id':students_id++,
                'FirstName':inputs[0].value,
                'LastName':inputs[1].value,
                'age':inputs[2].value
        
            }    
            students.push(newstudent);
            localStorage.setItem('students',JSON.stringify(students));
            localStorage.setItem('students_id',JSON.stringify(students_id))
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
        
         }else if
        (myform.getAttribute('type-of-form')=='edit'){

             let id =myform.getAttribute('add-id');
            let indexofstudents =students.findIndex((student) => {return student.id==id});
            students[indexofstudents]['FirstName'] =inputs[0].value;
            students[indexofstudents]['LastName'] =inputs[1].value;
            students[indexofstudents]['age'] =inputs[2].value;

            localStorage.setItem("students",JSON.stringify(students));
            
            getstudents (students);
            for (let input of inputs) {
                input.value='';
                
            }
            myBoutton.classList.add('btn-success');
            myBoutton.classList.remove('btn-info');
            myBoutton.textContent="Add new students";
             myform.setAttribute('type-of-form','add');
        }
});  
function getstudents (students){
     tBody.innerHTML= "";
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
    let Studentindex=students.findIndex( (student) =>{return student.id==myStudent.children[0].textContent});
    students.splice(Studentindex, 1);
    localStorage.setItem('students',JSON.stringify(students));
    myStudent.remove();   
 };
 function Editstudents(that){
    let myStudentElemnt =that.parentElement.parentElement;
    let myStudent ={
      'FirstName':myStudentElemnt.children[1].textContent,
       'LastName':myStudentElemnt.children[2].textContent,
       'age':myStudentElemnt.children[3].textContent,
    };
    inputs[0].value=myStudent['FirstName'];
    inputs[1].value=myStudent['LastName'];
    inputs[2].value=myStudent['age'];
    let i=0
    for(let key in myStudent){
        inputs[i++].value=myStudent[key];
    } 
   
    let myBoutton=document.querySelector("#StudentForm button[type='submit']")
    myBoutton.classList.remove('btn-success');
    myBoutton.classList.add('btn-info');
    myBoutton.textContent="Edit Student";
     myform.setAttribute('type-of-form','edit');
     myform.setAttribute('add-id',myStudentElemnt.children[0].textContent);
    
 }; 