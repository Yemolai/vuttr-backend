const modelName = 'Tool'

module.exports = mongoose => {
  const { Schema } = mongoose

  const previouslyDefinedModel = mongoose.models[modelName] || false
  if (previouslyDefinedModel) {
    return previouslyDefinedModel
  }

  const schema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
    link: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    tags: {
      type: [String],
      default: []
    }
  })

  model = mongoose.model(modelName, schema)
  return model
}
