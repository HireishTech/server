var jwt = require('jsonwebtoken');

const currentUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
          return res.sendStatus(403);
      }
      req.currentUser = user;
      next();
    });
  } else {
      res.sendStatus(401);
  }
};

module.exports = currentUser;