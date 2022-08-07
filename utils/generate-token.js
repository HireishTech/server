var jwt = require('jsonwebtoken');

const jwtAuth = {
  generateAccessToken(userInfo) {
    return jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: '6h' });
  }
    
}

module.exports = jwtAuth;