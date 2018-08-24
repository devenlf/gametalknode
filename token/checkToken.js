const jwt = require('jsonwebtoken');
module.exports = async (ctx, next) => {
  const authorization = ctx.request.header['token'];
  console.log(authorization)
  jwt.verify(authorization, 'sinner77', function (err, decoded) {
    if (err) {
      ctx.body = {
        state: 0,
        name: 'JsonWebTokenError',
        message: 'jwt malformed'
      }
    } else {
      if (decoded.user_id) {
        next();
      }
    }
  })
}