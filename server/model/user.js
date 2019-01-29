const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//---------------- CREATING USER SCHEMA

//creatig user schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: [3, 'your email address: {VALUE} must be least 3 characters long'],
        required: [true, 'email address is required'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }

    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Your password must be at least 6 characters long']
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//overide method, to return only id & email fields
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();

    return _.pick(userObj, ['_id', 'email']);
}


//create methods
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    // console.log('##### user=', user);
    const access = 'auth';
    const token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123');

    // user.tokens.push({ access, token }); //not good, might have issue with some version of mongo db. use this instead:
    user.tokens = user.tokens.concat([{ access, token }]);

    //save user & return the token
    return user.save().then(() => {
        return token
    });

};


//creating user model
const User = mongoose.model('User', UserSchema);


// export user with destructuring method
module.exports = { User };

// //TEST: export user without destructring
// module.exports = {
//     Blah: User
// }