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


//create methods (instance method)
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

// created model method (not instance method)
UserSchema.statics.findByToken = function (token) {
    const User = this;
    var decoded;
    /*  be very carefull:
        gw mau declare decoded and set to null:
        const decoded; 
        -> is syntax error (Missing initializer in const declaration)

        but kalo:
        var decoded;
        -> this is ok

        then kalo gw declare & initialize to null like this: 
        const decoded = null;
        -> is also bad.... i kept getting this error:
        TypeError: Cannot read property '_id' of null
        
        masalahnya is variable scope issue:
        kalo gw declaare const decoded = null, then 'decoded' itu di-reassign inside try-catch block.
        then those 'decoded' variables are 2 different variable. The 'decoded' inside try-catch is scopenya inside 
        try-catch block only. Makanya gw dapet "Cannot read property '_id' of null" error, soalnya itu 'decoded' variable
        outside try-catch block which is has value of null

        so, in this case use var not const
    
    */
    try {
        decoded = jwt.verify(token, 'abc123');

    } catch (error) {
        // will return a rejected promise 
        return Promise.reject();
    }

    console.log('------> decoded=', decoded);
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });

    /* 
       sebetulnya find by _id udah cukup sih. tapi mungkin Andrew (the teacher of this course)
       mau make sure to find in the very specific/secure way (including search by token & access).
       Also maybe Andrew mau kasih liat gimana cara utk search in the nested array, which is musti inside quotes
       'tokens.token' and 'token.access'  
    */
}


//creating user model
const User = mongoose.model('User', UserSchema);


// export user with destructuring method
module.exports = { User };

// //TEST: export user without destructring
// module.exports = {
//     Blah: User
// }