const mongoose = require('mongoose')

// mongoose.Promise = global.Promise //might not needed in mongoose 5.x
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })
    .then(result => {
        console.log('-----> connecting to the DB server')
    })
    .catch(err => {
        console.log('-----> error connecting to the server:', err.message)
    })

// module.exports={
//     mongoose:mongoose
// }


module.exports={
    mongoose
}