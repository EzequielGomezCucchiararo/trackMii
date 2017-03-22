const express = require('express')
const router = express.Router()

const listMembersHandler = require('./handlers/listMembers')
const sendMailHandler = require('./handlers/sendMail')

// List members
router.get('/:groupId', listMembersHandler)

// Send mail invitation
router.post('/sendEmail', sendMailHandler)

module.exports = router
