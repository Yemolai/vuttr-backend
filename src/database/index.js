const mongoose = require('mongoose');

const Models = require('./models')
const Repos = require('./repository')

module.exports = async ({ uri }) => mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => ({ mongoose, models: Models(mongoose) }))
  .then(({ mongoose, models }) => ({ mongoose, models, repos: Repos(models) }))
  .catch(err => {
    throw new Error(err.message)
  })
