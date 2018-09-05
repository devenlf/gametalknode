const jwt = require('jsonwebtoken');
module.exports = (token) => {
  return jwt.verify(token, 'sinner77',function(err, decoded){
    console.log(decoded)
  })}