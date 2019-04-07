const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
    time: {type: Date, default: Date.now},
    rating: Number,
    explanation: String,
    movie: {type:String, ref: 'MovieModel'},
    user: {type: String, ref: 'UserModel'}
}, {collection: 'review'});
module.exports = reviewSchema;