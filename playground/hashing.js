const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
    id: 4
};

const token = jwt.sign(data, 'doremix');
console.log('token=', token);

const decoded = jwt.verify(token, 'doremix');
console.log('decoded=', decoded);


// let msg = 'i am manuel'
// let hash = SHA256(msg);

// console.log(`message: ${msg}\nhash: ${hash}`)