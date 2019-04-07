const mongoose = require('mongoose');
const updateSchema = mongoose.Schema({
    time: {type: Date, default: Date.now},
    text: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'update'});
module.exports = updateSchema;