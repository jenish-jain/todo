const express = require('express')
const routes = require('./routes/index.js')
const db = require('./store/index.js')
const app = express()

const HOSTNAME = '127.0.0.1'
const PORT = 80
app.use(express.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

routes(app, db)


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started at http://${HOSTNAME}:${PORT}`);
})
