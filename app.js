const todoInput = document.querySelector(".to-do-input");
const todoButton = document.querySelector(".to-do-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

const alertSuccess = document.querySelector(".alert-success");
const alertWarning = document.querySelector(".alert-warning");


todoButton.addEventListener("click",addTodo)
todoList.addEventListener("click",listButton)
todoFilter.addEventListener("click",filterTodo)
function addTodo(e)
{
    e.preventDefault();
    const isNull = str => !str.trim().length;

    if(isNull(todoInput.value))
    {
        alertWarning.style.display ="block";
        setTimeout(() => {
            alertWarning.style.display ="none";
        }, 1500);
        todoInput.value= "";
    }
    else 
    {
        alertSuccess.style.display ="block";
        setTimeout(() => {
            alertSuccess.style.display ="none";
        }, 1500);

    saveLocalTodos(todoInput.value);
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const completedButton = document.createElement("button");
    completedButton.innerHTML =  "<i class='fas fa-check-circle'></i>";
    completedButton.classList.add("completedbtn");
    todoDiv.appendChild(completedButton);

    const newTodo = document.createElement("li");
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const trashButton = document.createElement("button");
    trashButton.innerHTML =  "<i class='fa fa-minus-circle'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);

    todoInput.value= "";
}
}

function listButton(e)
{
    const item = e.target;
    // Delete button
    if(item.classList[0]==="trash-btn")
    {
        const todo =item.parentElement;
        todo.classList.add("fall");
        removeLocalStorage(todo);
        todo.addEventListener("transitionend", function(){
        todo.remove();
        })
    }
    // Completed button
    if(item.classList[0]==="completedbtn")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodo(e)
{
    const todos = todoList.childNodes;
    todos.forEach(function(item){
        switch (e.target.value){
            case  "all" :
                item.style.display = "flex";
                break;
            case "completed" :
                if(item.classList.contains("completed")){
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!item.classList.contains("completed")){
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
        }
    })
}
// Local Storage
function saveLocalTodos(todo)
{
let todos;
if(localStorage.getItem("todos")===null){
    todos = [];
}
else {
    todos = JSON.parse(localStorage.getItem("todos"));
}
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalStorage(todo)
{
    let todos;
    if(localStorage.getItem("todos")===null)
    {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

