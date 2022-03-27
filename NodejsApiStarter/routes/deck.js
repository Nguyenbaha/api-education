const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const userController = require('../controllers/users');

const { validatorBody, validateParam, schemas } = require('../helpers/routerHelpers');

router.route('/')
    .get(userController.index) // 
    .post(userController.newUser) // 

// tim kiem, update user

module.exports = router;