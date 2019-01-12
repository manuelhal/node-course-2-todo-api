const mongoose = require('mongoose')

// mongoose.Promise = global.Promise //might not needed in mongoose 5.x
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(result => {
    console.log('-----> it is now connecting to the DB server')
  })
  .catch(err => {
    console.log('-----> error connecting to the server:', err.message)
  })

// module.exports={
//     mongoose:mongoose
// }

module.exports = { mongoose }
