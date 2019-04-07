const mongoose = require('mongoose');
const followSchema = mongoose.Schema({
    critic: {
        ref: 'UserModel',
        type: mongoose.Schema.Types.ObjectId
    },
    moviegoer: {
        ref: 'UserModel',
        type: mongoose.Schema.Types.ObjectId
    }
}, {collection: 'follows'});
module.exports = followSchema;