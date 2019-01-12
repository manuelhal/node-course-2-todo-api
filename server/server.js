const _ = require('lodash')
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

//======= TODOS ==========

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

//GET /todos/:id rout API (retrive todo with id)
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

//DELETE /todos/:id rout API (delete todo with id)
app.delete('/todos/:id', (req, res) => {
  //check if user enter a correct/valid id
  const docId = req.params.id

  if (!ObjectId.isValid(docId)) {
    // console.log('ID is not valid, doc not found')
    return res.status(404).send()
  }
  //id is valid
  Todo.findByIdAndDelete(docId)
    .then(todo => {
      // console.log('todo=', todo)
      if (!todo) {
        // console.log('No doc found, unable to delete')
        res.status(404).send()
      } else {
        // console.log('Doc found and deleted')
        res.status(200).send({ todo })
      }
    })
    .catch(err => {
      console.log('ERROR CATCH: ', err.message)
      return res.status(400).send('400 BAD REQUEST. ERR')
    })
})

//PATCH /todos/:id route API (update todo with id)
app.patch('/todos/:id', (req, res) => {
  const id = req.params.id
  const body = _.pick(req.body, ['text', 'completed'])

  //check if id is correct
  if (!ObjectId.isValid(id)) {
    // console.log('ID is not valid, doc not found')
    return res.status(404).send()
  }

  //setting the completedAt value with condition
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  // console.log('PATCH - updating DB now with body = ', body)
  //update the DB
  //example: https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
  Todo.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log('E R R O R - cannot find & update user', err)
        return res.send(404).body()
      }
      // console.log('SUCCESS: doc upadted:', doc)
      res.status(200).send({ doc })
    }
  )
})

//======= USERS ==========

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
