const jwt = require('jsonwebtoken');
module.exports = (token) => {
  jwt.verify(token, 'sinner77', function (err, decoded) {
    if (err) {
      ctx.body = {
        state: 0,
        name: 'JsonWebTokenError',
        message: 'jwt malformed'
      }
      return
    }
  })
  return decoded
}