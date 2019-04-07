const mongoose = require('mongoose');
const likeSchema = require('./like.schema.server')
const likeModel = mongoose.model('LikeModel', likeSchema)
module.exports = likeModel
