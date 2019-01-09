const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./model/todo')
const { User } = require('./model/user')
// const User = require('./model/user').Blah  //TEST: if not using destructuring method


const app = express()

app.use(bodyParser.json())


//POST todos route API
app.post('/todos', (req, res) => {
    // console.log('req.body=', req.body)
    const todo = new Todo({
        text: req.body.text
    })
    todo.save().then(result => {
        console.log('new todo saved', req.body)
        res.send(result)
    }, err => {
        console.log('error create new todo', err.message)
        res.status(400).send(err)
    })
})


//GET todos route API
app.get('/todos', (req, res) => {
    Todo.find({})
        .then(todos => {
            //the returning value (todos) from DB is an array and we're converted to obj with destructuring concept
            res.send({ todos })
        }, err => {
            res.status(400).send('ERROR collecting todos:', err)
        })
})


//POST users route API
app.post('/users', (req, res) => {
    const user = new User({
        email: req.body.email
    })
    user.save().then(result => {
        console.log('new user created', result)
        res.send(result)
    }, err => {
        console.log('error adding new user', err.message)
        res.status(400).send(err)
    })
})



//server is listening to port 3000
app.listen(3000, () => {
    console.log('Started on port 3000')
})

module.exports = { app }