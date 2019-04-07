const mongoose = require('mongoose')
const likeSchema = mongoose.Schema({
    time: {type: Date, default: Date.now},
    movie: {type: String, ref: 'MovieModel'},
    user: {type: String, ref: 'UserModel'}
}, {collection: 'likes'})

module.exports = likeSchema;