
const addBtn = document.getElementById("add-todo-button"); // + button to add todo
const newTodo = document.getElementById("add-todo"); // input filled for new todo
const delBtn = document.getElementsByClassName("delete");
const todoStatus = document.getElementsByClassName("status");
// const hostURL = "https://infinite-sea-44135.herokuapp.com/api/todos/" ; // heroku
const hostURL = "http://127.0.0.1:80/api/todos/"; //localhost
// let filter = localStorage.getItem("filter");
let filter = "all";
// console.log(filter);


    window.onload = async function(){
      // localStorage.setItem("filter", "all");
    displayTodo(filter);
    }

async function addTodoToDb() {
  try {
    console.log("adding todo");
    let todoCaption = newTodo.value;
    newTodo.value = "";
    let data = JSON.stringify({
      caption: todoCaption
    });
    let res = await fetch(hostURL, {
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

async function fetchTodos(status) {   // return todo data object
  //   console.log('fetching all todos');
  let res = await fetch(hostURL+"?todoStatus="+status);
  let data = await res.json();
  console.log(data);
  return data
}

async function onClick(){
    await addTodoToDb();
    displayTodo(filter);
}

async function createTodo(todo){
    var list = document.getElementById('todo-list');
    var li=document.createElement("li");
    li.classList.add("task");
    li.setAttribute("id", todo._id);
    var status = document.createElement("input");
    status.classList.add("status");
    status.setAttribute("type", "checkbox");
    status.setAttribute('onClick',"updateTodo()"); 
    status.setAttribute("id","status-"+ todo._id); // setting status id for each todo

    status.checked = (todo.isCompleted == "true");
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
    let delUri = hostURL+todo.id;
    await fetch(delUri,{
        method:'DELETE',
        headers: {'content-type': 'application/json'}
    });

   displayTodo(filter);
}

async function updateTodo(){
  console.log("updating todo");
  let todo = event.target.parentNode;
  console.log(todo.id);
  let status = event.target.checked.toString();
  // console.log(status);
  let updateUri = hostURL + todo.id;
  let data = JSON.stringify({
    isCompleted: status
  });
  console.log(updateUri);
  let res = await fetch(updateUri,{
    method:'PUT',
    body:data,
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log(res);
  // displayTodo();
  // let dataJson = await res.json();
    // console.log("Success:", JSON.stringify(dataJson));
    // return dataJson; 
}

async function displayTodo(selector){
  let todoData = await fetchTodos(selector);
  let todoList = todoData.data;
  document.getElementById('todo-list').innerHTML=" ";
    document.getElementById('loader').style.display='none';
    todoList.forEach(createTodo);
}
 function applyFilter (){
  let res = document.querySelectorAll("input[name=filter]:checked")[0].value;
  // console.log(res);
  
// localStorage.setItem("filter", res);

// console.log(localStorage.getItem("filter"));
  switch(res){
    case 'active':
      filter = 'false';
      break;

    case 'completed':
      filter = 'true';
      break;

    case 'all':
      filter = '';
      break;
  }

 displayTodo(filter);
}