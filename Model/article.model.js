const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let ArticleSchema = new Schema({
  title: String,
  description: String,
  image: String,
  tags: [String],
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  }, 
  date: {
    type: Date, 
    default: Date.now,
  }

})

module.exports = mongoose.model('Article', ArticleSchema);