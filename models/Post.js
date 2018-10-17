const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  }
})

module.exports = Post = mongoose.model('post', PostSchema)
