const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstname: String,
    lastname: String,
    type: {type: String, enum: ['CRITIC', 'MOVIEGOER']},
    email: String,
    phone: String,
    url: String,
    description: String,
    signUp: {type: Date, default: Date.now},
}, {collection: 'user'});
module.exports = userSchema;