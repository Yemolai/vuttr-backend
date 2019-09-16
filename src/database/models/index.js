const Tool = require('./tool.model')

const models = {
  Tool
}

module.exports = mongoose => Object.keys(models)
  .reduce((a, k) => ({ ...a, [k]: models[k](mongoose) }), {})
