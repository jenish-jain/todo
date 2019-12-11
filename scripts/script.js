const addBtn = document.getElementById("add-todo-button"); // + button to add todo
const newTodo = document.getElementById("add-todo"); // input filled for new todo
const delBtn = document.getElementsByClassName("delete");

Array.from(delBtn).forEach(function(element) {
  element.addEventListener("click", deleteTodo());
});

const todoStatus = document.getElementsByClassName("status");

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
    // console.log(todo.caption);
    var list = document.getElementById('todo-list');
    // var ul=document.createElement("ul");
    var li=document.createElement("li");
    li.classList.add("task");
    li.setAttribute("id", todo._id);
    var status = document.createElement("input");
    status.classList.add("status");
    status.setAttribute("type", "checkbox");
    // status.setAttribute("id","status-"+ todo._id); // setting status id for each todo
    var caption =document.createElement("span");
    caption.innerText = todo.caption;
    var del = document.createElement("a");
    del.classList.add('right-align');
    del.innerHTML = '<i class="material-icons delete">close</i>'
    li.appendChild(status);
    li.appendChild(caption);
    li.appendChild(del);
    // ul.appendChild(li);
    list.appendChild(li);

}