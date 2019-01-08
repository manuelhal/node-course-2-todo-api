const mongoose = require ('mongoose')

//---------------- CREATING TODO MODEL/ SCHEMA
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: [true, 'name of todo is required'],
        minLength: 2,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
})


module.exports={ Todo }