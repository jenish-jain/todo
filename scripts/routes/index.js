const ObjectID =  require('mongodb').ObjectID;

module.exports =  function(app,db){
    // db--> mondoDb
    // _id

    // post request to insert data in database
    app.post('/api/todos', (req,res) =>{
        const body = req.body
        if(body && body.caption){  // if body and body capton exixts in request
            const collection = db.collection('todo-collection');
            collection.insert({ // if a collection does not exist it will createa collection and insert the document in collection
                caption:body.caption,
                isCompleted:false
            })//insert
            .then(result =>{// on successful creation / insertion
                res.send({
                    status:'success',
                    message:'1 record created',
                    record:result.ops[0]                
                })
            })
            .catch(err =>{// in case error occurs
                res.status(400).send({
                    status:'error',
                    message:err
                })
            })
        }else{  // if request is made without any body and caption
            res.status(400).send({
                status:'error',
                message:'caption cannot be empty'
            })
        }
    })


    // get request to fetch data

    app.get('/api/todos/:todoId?', (req,res)=>{
        // get from DB when no ID is there
        const collection = db.collection('todo-collection')
        // console.log('collections', collection);
        const todoId = req.params.todoId;
        if(todoId){ // to get specific id data
            const findObj = {'_id':new ObjectID(todoId)};
            // console.log(findObj);
            collection
            .find(findObj)
            .toArray()
            .then(data =>{
                //console.log(data)
                res.send({
                 message:'success',
                 data:data   
                })
            })
            .catch(err =>{
                res.status(400).send({
                    status:'error',
                    message:err
                })
            })
        }else{
            // return all the results
            collection.find({}).toArray().then(data =>{
                res.send({
                    message:'success',
                    data:data
                })
            })
        }
    })

    // delete api

    app.delete('/api/todos/:todoId?', (req,res)=>{
        // get from DB when no ID is there
        const collection = db.collection('todo-collection')
        // console.log('collections', collection);
        const todoId = req.params.todoId;
        if(todoId){
            const delObj = {'_id':new ObjectID(todoId)};
            collection.deleteOne(delObj)
            .then(
                res.send({
                    message:'success',
                    deletedCount:'1'
                })
            )
            .catch(err =>{
                res.status(400).send({
                    status:'error',
                    message:err
                })
            })
        }else{
            collection.remove({})
            .then(
                res.send({
                    status:'success',
                    message:'all todo cleared'
                })
            )
        }
    })
}