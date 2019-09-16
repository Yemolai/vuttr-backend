require('dotenv').config()

const server = require('./src/server.js')

const defaultPort = 3000

const port = process.env.PORT || defaultPort

const connectionString = process.env.MONGODB_URI

if (!connectionString) {
  throw new Error('missing-connection-string')
}

server({ port, connectionString })
