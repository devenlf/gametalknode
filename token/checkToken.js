const jwt = require('jsonwebtoken');
module.exports = (token) => {
  let User_Id;
  jwt.verify(token, 'sinner77', function (err, decoded) {
    if (err) {
      ctx.body = {
        state: 0,
        name: 'JsonWebTokenError',
        message: 'jwt malformed'
      }
      return
    }
    User_Id = decoded
  })
  return User_Id
}