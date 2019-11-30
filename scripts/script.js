var addBtn = document.getElementById("add-todo-button") // plus button beside the add todo field
var newTodo = document.getElementById("add-todo")   // input text field

// addBtn.addEventListener("click", addTodo());
var statusCheckbox = document.getElementsByClassName("status")

function addTodo() {
    console.log('clicked');

    // return new Promise(function(resolve, reject){
        var caption = newTodo.value;
        newTodo.value = ""
        var data = JSON.stringify({
            "caption": caption   
        });
    
        var xhr = new XMLHttpRequest();
        
        xhr.open("POST", "http://127.0.0.1:80/api/todos");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                // resolve("data-pushed");
            }
        });
        displayTodo();
    // })
}


function createTodo(todo){
    // console.log(todo.caption);
    var list = document.getElementById('todo-list');
    var ul=document.createElement("ul");
    var li=document.createElement("li");
    li.classList.add("task");
    var status = document.createElement("input");
    status.classList.add("status");
    status.setAttribute("type", "checkbox");
    status.setAttribute("id","status-"+ todo.id); // setting status id for each todo
    var caption =document.createElement("span");
    caption.innerText = todo.caption;
    li.appendChild(status);
    li.appendChild(caption)
    ul.appendChild(li);
    list.appendChild(ul);
}

 function displayTodo(){
    // var todoCreated = await createTodo();
    // console.log('toDo created' + todoCreated);
    
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://127.0.0.1:80/api/todos/");

    xhr.send(null);

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
    console.log(this.responseText);
    var todoList = JSON.parse(this.responseText).data
    console.log('todoList',todoList);
    document.getElementById('todo-list').innerHTML= "";
    todoList.forEach(createTodo);
    }
    });

}

// structure of my task card 
/*
<ul>
<li class="task" id="todoId">
<input type="radio" class="status" > <label class="todo-caption"> caption</label>
</li>
</ul>
*/