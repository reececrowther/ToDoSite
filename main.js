

/* Background */
let numOfShapes = 5;

if(screen.width > 500){
    spawnShapes();
}else{
    mobilespawnShapes();
}

function mobilespawnShapes(){
    let bg = document.querySelector('.background');
    for(var i=0; i<2; i++){
        bg.innerHTML += `
        <div class="shape"></div>
    `;
}
    bg.children[0].style.top =  "20%";
    bg.children[0].style.left=  "-80px";
    bg.children[1].style.right =  "-30px";
    bg.children[1].style.bottom=  "20%";
}

function spawnShapes(){
    let bg = document.querySelector('.background');
    for(var i=0; i<numOfShapes; i++){
        bg.innerHTML += `
        <div class="shape"></div>
    `;
        
        var ranNubTop = Math.floor(Math.random() * (screen.height - 200)); 
        var ranNubLeft = Math.floor(Math.random() * (screen.width - 200)); 
        bg.children[i].style.top = "" + ranNubTop + "px";
        bg.children[i].style.left = "" + ranNubLeft + "px";


    } 
}

/* Date and time*/
const d = new Date();
let date = document.querySelector('.date');

date.innerHTML += '' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getUTCFullYear();



/* Data Storing */
var taskData = [];

loadData();
var storedData = JSON.parse(localStorage.getItem("task_data"));
document.querySelector('#push').addEventListener("click", addTask);

document.querySelector('#input-text').addEventListener("keyup", function(event) {
    if (event.keyCode === 13){
        addTask();
    }
});

function addTask(){
    if(document.querySelector('#new-task-button input').value.length == 0){
        alert("Please Enter a Task")
    }

    else{
        document.querySelector('#to-do-tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#new-task-button input').value}
                </span>
                <button class="delete">
                    <i class="fa fa-trash-o"></i>
                </button>
            </div>
        `;

            //save task to array
            taskData.push(document.querySelector('#new-task-button input').value)
            
        }

        //save task to storeage
        localStorage.setItem("task_data", JSON.stringify(taskData));
        console.log(taskData)

        //delete input text
        document.querySelector('#new-task-button input').value = '';

        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                
                var dataNum = this.parentNode.childNodes[0].nextSibling.innerHTML;
                for(var a=0; a<storedData.length; a++){
                    if( dataNum.indexOf(storedData[a]) != -1){                  
                        storedData.splice(a, 1);
                        localStorage.setItem("task_data",JSON.stringify(taskData));
                    }     
                }
                for(var j=0; j<taskData.length; j++){
                    if( dataNum.indexOf(taskData[j]) != -1){  
                                      
                        taskData.splice(j, 1);
                        localStorage.setItem("task_data",JSON.stringify(taskData));
                    }     
                }
                this.parentNode.remove();
            }
        }
}

function loadData(){
    var storedData = JSON.parse(localStorage.getItem("task_data"));
    if(storedData != null){
        for(var i=0; i<storedData.length; i++){
        document.querySelector('#to-do-tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${storedData[i]}
                </span>
                <button class="delete">
                    <i class="fa fa-trash-o"></i>
                </button>
            </div>
        `;
        }
        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){

                var dataNum = this.parentNode.childNodes[0].nextSibling.innerHTML;
                for(var a=0; a<storedData.length; a++){
                    if( dataNum.indexOf(storedData[a]) != -1){               
                        storedData.splice(a, 1);
                        taskData.splice(a, 1);
                        localStorage.setItem('task_data',JSON.stringify(storedData));
                    }     
                }

                this.parentNode.remove();
            }
        }
        
    }

}


