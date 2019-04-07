var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('Movie', movieSchema);
module.exports = movieModel;
