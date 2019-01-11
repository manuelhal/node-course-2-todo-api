const { ObjectId } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/model/todo')
const { User } = require('./../server/model/user')

// Todo.remove({}).then(res => {
//   console.log(res)
// })
// WARNING....DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.

// //use deleteMany({}) to delete all
// Todo.deleteMany({}).then(res => {
//   console.log(res)
// })

// Todo.findOneAndRemove({ _id: '5c382dcabca0701992433b0b' }).then(res => {
//   console.log(res)
// })
// DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.

// Todo.findOneAndDelete({ _id: '5c382f1b27adf94afcbd4ad3' }).then(res => {
//   console.log(res)
// })

// findByIdAndDelete() only pass the id, no need to pass obj
// it's nice since it will return the doc object that has been dleted
// Todo.findByIdAndDelete('5c38305681b3045ca46f0083').then(res => {
//   console.log(res)
// })
