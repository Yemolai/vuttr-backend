module.exports = models => ({
  find: ({ query = {}, limit = 10, after } = {}) =>
    models.Tool.find(after ? { ...query, _id: { $gt: after } } : query)
      .limit(limit)
      .exec(),
  findById: _id =>
    models.Tool.findById(_id)
      .exec(),
  create: tools =>
    models.Tool.create(tools)
      .exec(),
  update: (_id, newTool) =>
    models.Tool.findByIdAndUpdate(_id, newTool)
      .exec(),
  delete: ids =>
    models.Tool.deleteMany(ids)
      .exec()
})
