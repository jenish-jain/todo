const express = require('express')
const routes = require('./routes/index.js')
const mongodb = require('mongodb');
const DB_URI = 'mongodb+srv://jenish:Juju6397@cluster0-pa82h.mongodb.net/test?retryWrites=true&w=majority'
const app = express()

const HOSTNAME = '127.0.0.1'
const PORT = 80
app.use(express.json())
// prevent CORS error
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  console.log('checking connection with the DB...');
  mongodb.MongoClient.connect(DB_URI,(error,dbClient)=>{
      if(error){
          console.log('error connecting to dbClient ' , error)
          return
      }
      // on successful connection
      // console.log('successfully connected to the database instance :-->', dbClient)
      console.log('Successfully connnected to the database instance :-)');
      const database = dbClient.db('todo-app');
      routes(app, database)
      app.listen(PORT, HOSTNAME, () => {
          console.log(`Server started at http://${HOSTNAME}:${PORT}/`);
      })
  })



