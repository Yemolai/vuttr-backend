const express = require('express')
const morgan = require('morgan')
const database = require('./database')
const Routes = require('./routes')

module.exports = async ({ connectionString: uri, port = 8080 }) => {
  const db = await database({ uri })
  const app = express()
  const routes = Routes({ repos: db.repos })

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  app.get('/', (_, res) => res.json({ error: false, message: 'Welcome' }))

  // import routes here
  routes.forEach(route => app.use(route.path, route.router))

  app.get('.*', (_, res) => res.status(404).json({ error: true, message: 'not-found' }))

  process.on('uncaughtException', error => {
    morgan('combined').error('[uncaughtException]', error.message)
    process.exit(1)
  })

  process.on('unhandledRejection', error => {
    morgan('combined').error('[unhandledRejection]', error.message)
    process.exit(1)
  })

  return { app, db, server: app.listen(port) }
}
