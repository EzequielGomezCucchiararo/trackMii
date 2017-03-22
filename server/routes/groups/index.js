const express = require('express')
const router = express.Router()
const passport = require(__base + 'config/passport')

const addGroupHandler = require('./handlers/addGroup')
const joinGroupHandler = require('./handlers/joinGroup')
const listAsMemberHandler = require('./handlers/listAsMember')
const listAsAdminHandler = require('./handlers/listAsAdmin')

// Add
router.post('/add', addGroupHandler)

// Add
router.post('/join', joinGroupHandler)

// List as member
router.get('/listAsMember/:userId', listAsMemberHandler)

// List as member
router.get('/listAsAdmin/:userId', listAsAdminHandler)

// all these routes require JWT token
router.use(passport.authenticate('jwt', { session: false }))

module.exports = router
