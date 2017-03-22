const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const collection = 'users'
const options = {}

const UserSchema = new Schema({
  groupsAsMember: [{type: Schema.ObjectId, ref: 'Group'}],
  groupsAsAdmin: [{type: Schema.ObjectId, ref: 'Group'}]
}, { collection })

UserSchema.plugin(passportLocalMongoose, options)

module.exports = mongoose.model('User', UserSchema)
