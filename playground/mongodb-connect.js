// const MongoClient = require('mongodb').MongoClient
// const { MongoClient } = require('mongodb') //identical as above but wth obj destructuring style
const { MongoClient, ObjectID } = require('mongodb')

const obj = ObjectID()
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client)=>{
    if(err){
        //adding return keyword is to make sure if error occurs, it won't execute to the next line
        return console.log('Unable to connect to DB: ',err)
    }
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp');


    // //destructuring
    // const user = {name:"john", age: "25"}
    // const { age, name } = user
    // console.log ('name, age' , name, age) //john, 25

    // db.collection('Todo').insertOne({
    //     text:'Some new to do',
    //     completed: false
    // },(err, result)=>{
    //     if(err){
    //         return console.log('Unable to insert new todo:', err)
    //     }

    //     // console.log(JSON.stringify(result.ops,undefined,2))
    //     console.log(JSON.stringify(result))
    // })

    // db.collection('Users').insertOne({
    //     name:'joe',
    //     age: 48,
    //     location:'los angeles'
    // },(err, result)=>{
    //     if(err){
    //         return console.log('Unable insert a new user data: ',err)
    //     }
        
    //     // console.log(JSON.stringify(result.ops,undefined,2))
    //     console.log(result.ops[0]._id.getTimestamp())
    // })
    
    client.close()
})
