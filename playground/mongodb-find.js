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

    //find specific doc with ID
    // db.collection('Todos').find({
    //     _id: ObjectID('5c303c84d6090d2808394c45')
    // }).toArray().then( (docs) =>{
    //     console.log('Todo')
    //     console.log(JSON.stringify(docs,undefined,2))
    // }, err=>{
    //     console.log('Error found:', err)
    // } )

    //find all todos
    // db.collection('Todos').find().toArray().then( (docs) =>{
    //     console.log('Todo')
    //     console.log(JSON.stringify(docs,undefined,2))
    // }, err=>{
    //     console.log('Error found:', err)
    // } )

    // using count
    // db.collection('Todos').find().count().then( (count) =>{
    //     console.log(`Found ${count} todo(s)` )
    // }, err=>{
    //     console.log('Error found:', err)
    // } )

    // find user with query
    // db.collection("Users").find({name: "Manuel"}).toArray().then((arr)=>{
    //     console.log('Users')
    //     console.log(JSON.stringify(arr,undefined,2))
    // },(err)=>{
    //     console.log("error found: ", err)
    // })

    //find all users
    db.collection("Users").find({}).toArray().then((arr)=>{
        console.log(JSON.stringify(arr,undefined,2))
    },(err)=>{
        console.log("error found: ", err)
    })



    client.close()
})
