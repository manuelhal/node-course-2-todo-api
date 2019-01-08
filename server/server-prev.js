const { mongoose } = require('./db/mongoose')



// const newTodo = new Todo({
//     text: 'Eat dinner'
// })

// newTodo.save().then( (doc)=> {
//     console.log('Saved todo: ',doc)
// }, (err)=>{
//     console.log('unable save todo', err)
// })


const todo2 = new Todo({
    text: '    play drum                   '
})

// todo2.save()
//     .then((result) => {
//         console.log('Doc saved: ', JSON.stringify(result))
//     }, (err) => {
//         console.log('can not save doc: ', err.message)
//     })
//     .then(() => {
//         //closing mongoose connection after saving doc
//         //make sure close the conn is after data save, otherwise will get 'server instance pool was destroyed' error
//         mongoose.connection.close()
//             .then(result => {
//                 console.log('-----> Server connection is now closed')
//             })
//     })
//     .catch(err => {
//         console.log('-----> error closing server connection:', err.message)
//     })



const user1 = new User({
    email: '   joko@hotmail.com        '
})

// DB close function
const dbClose=()=>{
    mongoose.connection.close(() => {
        console.log('-----> server connection is closed ')
    })
}

//saving user, but not sure if this flow/logic is corect
// basically i want that if there's an error, i still want to close the server conn
user1.save()
    .then(result => {
        console.log('User created:', result)
    }, err => {
        console.log('ERROR creating new user:', err.message)
    })
    .then(()=>{
        dbClose()
    })
    // () => {
    //     mongoose.connection.close(() => {
    //         console.log('-----> server connection is closed ')
    //     })
    // })
    .catch(err => {
        console.log('Catched some ERRORS: ', err.message)
    })




