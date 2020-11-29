const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: false},
    image: {type: String, required: false}
});

module.exports = model('User', userSchema);
