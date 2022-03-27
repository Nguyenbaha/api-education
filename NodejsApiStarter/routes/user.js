const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const userController = require('../controllers/users');

const { validatorBody, validateParam, schemas } = require('../helpers/routerHelpers');

router.route('/')
    .get(userController.index) // lấy ra all users
    .post(validatorBody(schemas.userSchema), userController.newUser) // tạo 1 user mới

// tim kiem, update user
router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), userController.getUser)
    .put(validateParam(schemas.idSchema, 'userId'), validatorBody(schemas.userSchema), userController.replaceUser)
    .patch(validateParam(schemas.idSchema, 'userId'), validatorBody(schemas.userOptionalSchema), userController.updateUser)

// xu ly cac quan he trong mongodb
router.route('/:userId/decks')
    .get(validateParam(schemas.idSchema, 'userId'), userController.getUserDecks)
    .post(validateParam(schemas.idSchema, 'userId'), validatorBody(schemas.deckSchema), userController.newUserDeck)

module.exports = router;