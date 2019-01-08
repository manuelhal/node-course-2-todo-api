const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Todo }  = require('./model/todo')
const { User } = require('./model/user')

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    // console.log('req.body=', req.body)
    const todo = new Todo({
        text: req.body.text
    })
    todo.save().then(result =>{
        console.log('new todo saved', req.body)
        res.send(result)
    },err=>{
        console.log('error create new todo', err.message)
        res.status(400).send(err)
    })
})


app.listen(3000, ()=>{
    console.log('Started on port 3000')
})






