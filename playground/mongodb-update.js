const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client)=>{
    if(err){
        //adding return keyword is to make sure if error occurs, it won't execute to the next line
        return console.log('Unable to connect to DB: ',err)
    }
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp');

    // db.collection("Todos").findOneAndUpdate({
    //     _id: new ObjectID("5c316f596630788c2b1d4477")
    // },
    // {
    //     $set: {
    //         completed: true
    //     }
    // },
    // {
    //     returnOriginal: false
    // })
    // .then((result)=>{
    //     console.log(result)
    // })

    //challenge: update 1 single user (with specific _id) then modify the age
    db.collection('Users').findOneAndUpdate(
        { _id : new ObjectID('5c315c9a2b5a2e4a0447c9d8') },
        { $set : { name: 'Jimbo' }, $inc: {age: -6} },  
        { returnOriginal: false }
    ).then((result)=>{
        console.log(result)
    })
   
    client.close()
})
