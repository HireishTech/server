const { body} = require('express-validator')

const validatorMiddleware = {
  validate (method){
    switch (method) {
      case 'createUser': {
        return [ 
          body('email', 'Invalid email').exists().isEmail(),
          body('fName', 'first name is required').exists(),
          body('phoneNo', 'Phone number is required').exists(),
          body('password','Please enter a password at least 8 character').exists().isLength({ min: 8 })
        ]
      }
      case 'loginUser': {
        return [ 
          body('email', 'email is required').exists().isEmail(),
          body('password','password is required').exists()
        ]
      } 
    }
  }
}

module.exports = validatorMiddleware;
