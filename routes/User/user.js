const express = require('express');
const router = express.Router();
const userController = require('../../controllers/User/user');
const validatorMiddleware = require('../../middlewares/validator');
const currentUser = require('../../middlewares/currentUser');

router.post(
    '/register', 
    validatorMiddleware.validate('createUser'),
    userController.createUser
)
router.post(
    '/login', 
    validatorMiddleware.validate('loginUser'),
    userController.loginUser
)
router.get(
    '/alluser',
    currentUser,
    userController.allUser
)
module.exports = router;