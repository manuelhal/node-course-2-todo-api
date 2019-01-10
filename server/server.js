const express = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./model/todo')
const { User } = require('./model/user')
// const User = require('./model/user').Blah  //TEST: if not using destructuring method

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

//POST todos route API
app.post('/todos', (req, res) => {
  // console.log('req.body=', req.body)
  const todo = new Todo({
    text: req.body.text
  })
  todo.save().then(
    result => {
      //   console.log('new todo saved', req.body)
      res.send(result)
    },
    err => {
      //   console.log('Error create new todo: ', err.message)
      res.status(400).send(err)
    }
  )
})

//GET todos route API (all todos)
app.get('/todos', (req, res) => {
  Todo.find({}).then(
    todos => {
      //the returning value (todos) from DB is an array and we're converted to obj with destructuring concept
      res.send({ todos })
    },
    err => {
      res.status(400).send('ERROR collecting todos:', err)
    }
  )
})

//GET /todos/id rout API (todo with id)
app.get('/todos/:id', (req, res) => {
  const todoId = req.params.id
  //check if the id is proper
  if (!ObjectId.isValid(todoId)) {
    // console.log('ERROR!!! Invalid ID format ')
    // IMPORTANT!! need 'return' kalo ga bakal execute next line, Todo.findbyId() function.
    return res.status(404).send()
    // return res.status(404).send('ERROR!!! Invalid ID format ') //ga perlu kirim message body, just empty body .send()
  }

  Todo.findById(todoId)
    .then(todo => {
      if (!todo) {
        // console.log('Unable to find that todo.....')
        //need 'return' kalo ga will exceute the next line
        return res.status(404).send()
      }
      // console.log('Find 1 todo:',todo)
      res.send({ todo }) //send todo as object
    })
    .catch(err => {
      // console.log('CATCH ERROR finding a todo with that ID.....')
      res.status(400).send('CATCH ERROR finding a todo with that ID')
    })
})

//POST users route API
app.post('/users', (req, res) => {
  const user = new User({
    email: req.body.email
  })
  user.save().then(
    result => {
      console.log('new user created', result)
      res.send(result)
    },
    err => {
      console.log('error adding new user', err.message)
      res.status(400).send(err)
    }
  )
})

//GET users route API
app.get('/users', (req, res) => {
  User.find({}).then(
    users => {
      // console.log('Returning all users', users)
      console.log('Returning all users...')
      res.send({ users })
    },
    err => {
      console.log('Unable to retrieve users', err.message)
      res.status(400).send(err)
    }
  )
})

//handling other routes
app.get('*', (req, res) => {
  console.log('response to other routes (catch all)')
  res.send('Nothing here, please go back')
})

//server is listening to port 3000
app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = { app }
