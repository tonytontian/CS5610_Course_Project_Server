const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    imdbID: String,
    Title: String,
    Poster: String
}, {collection: 'movies'});
module.exports = movieSchema;