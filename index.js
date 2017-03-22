const fs = require('fs')
const thereIsDotEnv = fs.existsSync('.env')

if (thereIsDotEnv) require('dotenv').config()

global.__base = __dirname + '/server/'

const app = require('./server/app')
const db = require('./server/config/db')

// init Socket.io
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const socketIo = require('./server/config/sockets')
socketIo(io)

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/trackmii'
const PORT = process.env.PORT

console.log(`connecting to ${DB_URI}...`)

db.open(DB_URI)

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
