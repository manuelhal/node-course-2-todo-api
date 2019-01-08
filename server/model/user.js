const mongoose = require ('mongoose')

//---------------- CREATING USER SCHEMA

//creatig user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: [3, 'your email adress must be more than 3 letters'],
        required: [true, 'email address is required']
    }
})
//creating user model
const User = mongoose.model('User', userSchema)



module.exports={ User }