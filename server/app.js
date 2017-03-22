const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const routesAuth = require('./routes/auth')
const routesGroup = require('./routes/group')
const routesGroups = require('./routes/groups')
// const routesTrack = require('./routes/track')

const app = express()

app.use(express.static(path.join(__dirname, '../client')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routesAuth)
app.use('/group', routesGroup)
app.use('/groups', routesGroups)
// app.use('/track', routesTrack)

module.exports = app
