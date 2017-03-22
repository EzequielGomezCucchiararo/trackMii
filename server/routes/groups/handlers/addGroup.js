const Group = require(__base + 'models/Group.js')
const User = require(__base + 'models/User.js')

module.exports = addGroup

function addGroup (req, res) {
  const {groupName, members, admin} = req.body
  let group = new Group({groupName, members, admin})

  group.save()

  User.findOne({ '_id': admin }, 'username groupsAsMember groupsAsAdmin', (err, user) => {
    if (err) throw err
    let groupId = group._id.toString()
    user.groupsAsMember.push(groupId)
    user.groupsAsAdmin.push(groupId)
    user.save()
  })

  res.json(group)
}
