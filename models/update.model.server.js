const mongoose = require('mongoose');
const updateSchema = require('./update.schema.server')
const updateModel = mongoose.model('UpdateModel', updateSchema)
module.exports = updateModel
