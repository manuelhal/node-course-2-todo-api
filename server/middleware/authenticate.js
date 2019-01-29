var { User } = require('./../model/user');


//create a middleware function called 'authenticate'
const authenticate = (req, res, next) => {
    const token = req.header('x-auth');

    User.findByToken(token)
        .then(user => {
            if (!user) {
                //we want to send a rejected Promise, which will be catched in the catch block
                Promise.reject();
            }

            //will modify the request, then do next
            req.user = user;
            req.token = token;
            next(); //need to call next, othewise it will not continue / will hanging
        })
        .catch(err => {
            // console.log('ERROR CATCH: ', err);
            res.status(401).send();
        })
};

module.exports = { authenticate };