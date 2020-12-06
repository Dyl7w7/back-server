const {Schema, model} = require('mongoose');

const albumSchema = Schema({
    title: {type: String, require: true},
    description: {type: String},
    year: {type: Number, },
    image: {type: String},
    //artist: {type: Schema.Types.ObjectId, ref: 'Artist', required: true},
    //user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

albumSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.AlbumID = _id;
    return object;
});

module.exports = model('Album', albumSchema);
