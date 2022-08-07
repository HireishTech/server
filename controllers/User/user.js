const bcrypt = require('bcrypt');
const User = require('../../models/User/user');
const { validationResult } = require('express-validator')
const jwtAuth = require('../../utils/generate-token');
const currentUser = require('../../middlewares/currentUser');

const userController = {

  createUser(req,res){
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    bcrypt.hash(req.body.password, 12, function(err, hash){
      const fName= req.body.fName;
      const lName= req.body.lName;
      const email= req.body.email;
      const phoneNo= req.body.phoneNo;
      const password= hash;
      var newUser = new User({fName,lName,email,phoneNo,password})
      newUser.save()
      .then(user => {
          var message={success:"successfully registered!",data:user};
          res.json(message);
      })
      .catch(err => {
          var message = {errors:"Something went wrong!",err};
          res.json(message);
      })     
    })
  },

  loginUser(req,res){
    User.findOne({ email: req.body.email}, function(err, user){
      if(err){
        res.json(err);
      }
      else if(!user){
        var message = {error: "user not registered, please try again"}
        res.json(message);
      }
      else {
        const userInfo={ 
          id: user._id,
          phoneNo: user.phoneNo,
          email: user.email,
          logged: false,
        };

        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(result){
            userInfo.logged = true;

            var authToken = jwtAuth.generateAccessToken(userInfo);

            var output = { 
              token:authToken,
              user: userInfo,
              message: { success: "Successfully Login" }
            }
            res.json(output);
          }
          else{
            var message = { 
              error: "email and password is not matched" 
            }
            res.json(message);
          }
        })
      }
    });
  },
  allUser(req, res) {
    User.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err =>{
      res.json(err);
    })
  }


}

module.exports = userController;

