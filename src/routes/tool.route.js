const { Router } = require('express')

const path = '/tools'

const init = ({ repos }) => {
  const { Tool: ToolRepo } = repos
  const router = new Router()
  router.get('/', async (req, res) => {
    const { limit: _limit = 10, after, tag } = req.query
    try {
      const limit = Math.ceil(Number(_limit))
      if (isNaN(limit)) {
        return res.status(400).json({ error: true, message: 'limit-must-be-a-number' })
      }
      if (limit < 1) {
        return res.status(400).json({ error: true, message: 'limit-must-be-positive' })
      }
      const tagQuery = tag ? { tags: { $all: Array.isArray(tag) ? tag : [tag] } } : {}
      const query = { ...tagQuery }
      const tools = await ToolRepo.find({ query, limit, after })
      return res.status(200).json({ error: false, data: tools })
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message })
    }
  })
  return router
}

module.exports = { path, init }
