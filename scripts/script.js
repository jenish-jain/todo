const addBtn = document.getElementById("add-todo-button"); // + button to add todo
const newTodo = document.getElementById("add-todo"); // input filled for new todo
const delBtn = document.getElementsByClassName("delete");
const todoStatus = document.getElementsByClassName("status");

    window.onload = async function(){
    let todoData = await fetchTodos();
    let todoList = todoData.data;
    document.getElementById('todo-list').innerHTML= "";
    todoList.forEach(createTodo);
    }
async function addTodoToDb() {
  try {
    console.log("adding todo");
    let todoCaption = newTodo.value;
    newTodo.value = "";
    let data = JSON.stringify({
      caption: todoCaption
    });
    let res = await fetch("http://127.0.0.1:80/api/todos", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
    let dataJson = await res.json();
    console.log("Success:", JSON.stringify(dataJson));
    // return dataJson;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchTodos() {   // return todo data object
  //   console.log('fetching all todos');
  let res = await fetch("http://127.0.0.1:80/api/todos");
  let data = await res.json();
  console.log(data);
  return data
}

async function onClick(){
    await addTodoToDb();
    let todoData = await fetchTodos();
    let todoList = todoData.data;
    document.getElementById('todo-list').innerHTML= "";
    todoList.forEach(createTodo);
}

function createTodo(todo){
    var list = document.getElementById('todo-list');
    var li=document.createElement("li");
    li.classList.add("task");
    li.setAttribute("id", todo._id);
    var status = document.createElement("input");
    status.classList.add("status");
    status.setAttribute("type", "checkbox");
    status.setAttribute("id","status-"+ todo._id); // setting status id for each todo
    var caption =document.createElement("span");
    caption.innerText = todo.caption;
    var del = document.createElement("a");
    del.setAttribute('onClick',"deleteTodo()");
    del.classList.add('right-align');
    del.innerHTML = '<i class="material-icons delete">close</i>'
    li.appendChild(status);
    li.appendChild(caption);
    li.appendChild(del);
    list.appendChild(li);
}

async function deleteTodo(){
    let todo = event.target.parentNode.parentNode; // the del incon is inside a <a> tag which is inside the main task <div>
    console.log(todo.id);
    let delUri = "http://127.0.0.1:80/api/todos/"+todo.id;
    await fetch(delUri,{
        method:'DELETE',
        headers: {'content-type': 'application/json'}
    });

    let todoData = await fetchTodos();
    let todoList = todoData.data;
    document.getElementById('todo-list').innerHTML= "";
    todoList.forEach(createTodo);
}