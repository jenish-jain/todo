const express = require('express')
const routes = require('./routes/index.js')
const db = require('./store/index.js')
const app = express()

const HOSTNAME = '127.0.0.1'
const PORT = 2222
app.use(express.json())

var addBtn = document.getElementById('add-todo-button')
var newTodo = document.getElementById("add-todo")

addBtn.addEventListner("click", addTodo());


function addTodo() {
    console.log('clicked');
    var caption = newTodo.value;
    console.log(caption)
    newTodo.value = ""
    var data = JSON.stringify({
        "caption": caption
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://127.0.0.1:2222/api/todos");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

app.use(express.json())

routes(app, db)


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started at http://${HOSTNAME}:${PORT}`);
})
