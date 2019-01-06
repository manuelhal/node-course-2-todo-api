// const MongoClient = require('mongodb').MongoClient
// const { MongoClient } = require('mongodb') //identical as above but wth obj destructuring style
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client)=>{
    if(err){
        //adding return keyword is to make sure if error occurs, it won't execute to the next line
        return console.log('Unable to connect to DB: ',err)
    }
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp');

    // //delete many
    // db.collection('Todos').deleteMany({text:'walk the cat'}).then((result)=>{
    //     console.log(result.result)
    // },(err)=>{
    //     console.log(err)
    // })

    
    // //delete one
    // db.collection('Todos').deleteOne({text:'eat lunch'}).then((result)=>{
    //     console.log(result.result)
    // },(err)=>{
    //     console.log(err)
    // })

    //findOneandDelete -> this is useful, since it will return the document that we delete inside the result obj, like this
    // { lastErrorObject: { n: 1 },
    //     value:
    //     { _id: 5c303d93182fb61bbcc57c92,
    //         text: 'wash dishes',
    //         completed: false },
    //     ok: 1 }
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    //     console.log(result)
    // },(err)=>{
    //     console.log(err)
    // })


    // challenge:
    // delete all users that has name = Manuel
    // db.collection("Users").deleteMany({name:"Manuel"}).then(result =>{
    //     console.log(result.result)
    // })


    //delete 1 user with specific _id
    db.collection("Users").findOneAndDelete({_id: ObjectID("5c3171e96630788c2b1d44e1")}).then(result =>{
        console.log(result)
    }, err=>{
        console.log('error found: ', err)
    })






    client.close()
})
