const {Schema, model} = require('mongoose');

const albumSchema = Schema({
    number: {type: Number, require: true},
    name: {type: String, require: true},
    duration: {type: String},
    file: {type: String},
    //album: {type: Schema.Types.ObjectId, ref: 'Album', required: true},
});

albumSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.SongID = _id;
    return object;
});

module.exports = model('Song', albumSchema);

