const mongoose = require('./index'),
  Schema = mongoose.Schema;

let gameList = new Schema({
  gameId: { type: String },                       //游戏Id
  gameName: { type: String },                    //游戏名称
  gameDes: { type: String },
  gameLink: { type: String },
  logoLink: { type: String },
  tieziNum: { type: Number },
  liulanNum: { type: Number }
});


module.exports = mongoose.model('GameList', gameList);