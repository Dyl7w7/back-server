const {Schema, model} = require('mongoose');

const artistSchema = Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    image: {type: String, required: false},
    //user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

artistSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.ArtistID = _id;
    return object;
});

module.exports = model('Artist', artistSchema);