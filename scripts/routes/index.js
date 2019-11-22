module.exports = function(app,db){
    
    app.post('/api/todos',(req,res)=>{
        const body = req.body
    
        if(body.caption){
            const insertedRecord = db.insertIntoStore(body.caption)
            res.send({
                status:'success',
                message:' 1 record created',
                record:insertedRecord
            })
        }else{
            res.status(400).send({
                status:'error',
                message:'caption cannot be empty'
            })
        }
    })
    
    // read all
    app.get('/api/todos/', (req,res)=>{
        var data = db.getStoreData()
        res.send(data)
    })

    // read specific todo
    app.get('/api/todos/:todoId', (req,res)=>{
        if(req.params.todoId){
            var id = req.params.todoId
            var data = db.getStoreData(id)
            res.send('user requested for'+ id + " => "+data.caption)
        }
    })
    
}
