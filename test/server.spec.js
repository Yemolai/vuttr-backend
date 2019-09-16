const chai = require('chai')
const chaiHttp = require('chai-http')
const { MongoMemoryServer } = require('mongodb-memory-server')

const Server = require('../src/server')
const mongoServer = new MongoMemoryServer()

chai.use(chaiHttp)

const { expect, request } = chai

describe('server integration tests', function () {
  let expressApp, httpServer
  before(async function () {
    const connectionString = await mongoServer.getConnectionString()
    const { server, app } = await Server({ port: 8089, connectionString })
    expressApp = app
    httpServer = server
  })
  after(async function () {
    await httpServer.close()
    await require('mongoose').connection.close()
    await mongoServer.stop()
  })
  it('should start server without crashing', async function () {
    expect(expressApp, 'instance must be defined').to.exist
    const response = await request(expressApp).get('/')
    expect(response, 'response be defined')
      .to.exist
      .and.to.haveOwnProperty('statusCode')
      .and.to.be.eq(200, 'status code should be 200')
  })
})
