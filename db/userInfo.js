/**
 * 用户信息
 */
const mongoose = require('./index'),
  Schema = mongoose.Schema;

let UserSchema = new Schema({
  userId: { type: String },                       //用户Id
  nickname: { type: String },
  username: { type: String },                    //用户账号
  userpwd: { type: String },                        //密码
  email: { type: String },                        //年龄
  phone: { type: Number },                       //最近登录时间
  grade: { type: Number }
});

module.exports = mongoose.model('User', UserSchema);