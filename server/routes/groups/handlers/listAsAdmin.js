const Group = require(__base + 'models/Group.js')
const User = require(__base + 'models/User.js')

module.exports = listGroupAsAdmin

function listGroupAsAdmin (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err) throw err
    Group.populate(user, {path: 'groupsAsAdmin'}, function (err, user) {
      if (err) throw err
      res.json(user.groupsAsAdmin)
    })
  })
}
