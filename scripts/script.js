document.getElementById("todo-list").innerText = "hello";


var addBtn = document.getElementById("add-todo-button")
var newTodo = document.getElementById("add-todo")

// addBtn.addEventListener("click", addTodo());


function addTodo() {
    console.log('clicked');
    var caption = newTodo.value;
    newTodo.value = ""
    var data = JSON.stringify({
        "caption": caption   
    });

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://127.0.0.1:80/api/todos");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

    displayTodo();
}

function displayTodo(){
    console.log('displaying todo')

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://127.0.0.1:80/api/todos/");

    xhr.send(null);

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
    // console.log(this.responseText);
    var todoList = JSON.parse(this.responseText)
    document.getElementById('todo-list').innerHTML= "";
    todoList.forEach(createTodo);
    }
    });

}

function createTodo(todo){
    console.log(todo.caption);
    var list = document.getElementById('todo-list');
    var ul=document.createElement("ul");
    var li=document.createElement("li");
    li.innerText = todo.caption;
    ul.appendChild(li);
    list.appendChild(ul);
}