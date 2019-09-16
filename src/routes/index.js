const Tool = require('./tool.route')

const routes = [
  Tool
]

module.exports = ({ repos }) =>
  routes.map(({ path, init }) => ({ path, router: init({ repos }) }))
