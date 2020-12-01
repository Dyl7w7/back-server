const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: false},
    image: {type: String, required: false}
});

userSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.UserID = _id;
    return object;
});

module.exports = model('User', userSchema);
