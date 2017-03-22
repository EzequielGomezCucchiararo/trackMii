const User = require('../../../models/User.js')
const Group = require('../../../models/Group.js')

module.exports = (req, res) => {
  const { groupId, userId } = req.body
  User.findOne({ '_id': userId }, '_id username groupsAsMember', (err, user) => {
    if (err) throw err
    user.groupsAsMember.push(groupId)
    user.save()
    Group.findOne({ '_id': groupId }, '_id groupName members', (err, group) => {
      if (err) throw err
      let userToAdd = {'userId': user._id.toString(), 'username': user.username}
      group.members.push(userToAdd)
      group.save()
      res.send()
    })
  })
}
