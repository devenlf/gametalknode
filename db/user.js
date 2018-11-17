const mongoose = require('./index'),
  Schema = mongoose.Schema;


let gameReplies = new Schema({
  gameId: { type: String },
  title: { type: String },
  content: { type: String },
  imageUrl: { type: Array },
  date: { type: String },
  name: { type: String },
  reviewId: { type: String }
})

module.exports = mongoose.model('GameReplies', gameReplies);