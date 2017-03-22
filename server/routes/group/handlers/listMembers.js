const Group = require(__base + 'models/Group')

module.exports = (req, res) => {
  let {groupId} = req.params
  console.log(groupId)
  Group.findById(groupId, (err, group) => {
    if (err) throw err
    res.json(group)
  })
}
