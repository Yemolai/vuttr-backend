const Tool = require('./tool.repository')

const repos = {
  Tool
}

module.exports = models => Object.keys(repos)
  .reduce((a, k) => ({ ...a, [k]: repos[k](models) }), {})
