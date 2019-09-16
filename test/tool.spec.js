const { expect } = require('chai')
const mongoose = require('mongoose')
const ToolModel = require('../src/database/models/tool.model')

describe('tool test', function () {
  const Tool = ToolModel(mongoose)
  it('should get model errors when object is malformed', function (done) {
    const tool = new Tool()
    tool.validate(validation => {
      expect(validation)
        .to.exist
        .and.to.haveOwnProperty('errors')
      const { title, link } = validation.errors
      expect(title).to.exist
      expect(link).to.exist
      done()
    })
  })
})
