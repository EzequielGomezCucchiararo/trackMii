const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'groups'

// Group Schema
const GroupSchema = new Schema({
  groupName: {
    type: String,
    index: true
  },
  members: Array,
  admin: String
}, { collection })

module.exports = mongoose.model('Group', GroupSchema)
