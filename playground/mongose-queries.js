const { ObjectId } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/model/todo')

// const id = '5c35a0d2bb0ebb4594ea9231' // valid ID and available in coll
// const id = '5c35a0d2bb0ebb4594ea9230' // valid ID but not found in coll
// const id = '5c35a0d2bb0ebb4594ea9230xx' //invalid ID, will throw an err

// //there are some helpful prop in the ObjectId, for example...
// if (!ObjectId.isValid(id)) {
//     // return console.log('doc ID is not valid')  //adding 'return' won't execute the error-catch below
//     console.log('doc ID is not valid')
// }

// Todo.find({
//     _id: id
// }).then(todos => {
//     console.log('todos with id =', todos)
// })

// Todo.find({}).then(todos => {
//     console.log('todos all =', todos)
// })

// Todo.findOne({ completed: false }).then(todo => {
//     console.log('todo =', todo)
// })

// Todo.findById(id).then(todo => {
//     if (!todo) {
//         return console.log('todoById --> sorry, id not found')
//     }
//     console.log('todoById =', todo)
// })
//     .catch(err => { console.log('ERROR ID:', err.message) })


//----------CHALLENGE--------------

const { User } = require('./../server/model/user')

const userId = '5c32b716c8911117284f814e'
// const userId = '5c32b716c8911117284f814ex'
// const userId = '6c32b716c8911117284f814e'

User.findById(userId)
    .then(user => {
        if (!user) {
            return console.log('sorry, user not found')
        }
        // console.log('found 1 user: ', user)
        console.log('found 1 user: ', JSON.stringify(user, undefined, 2))
    })
    .catch(err => {
        console.log('ERROR!!!... ', err.message)
    })


