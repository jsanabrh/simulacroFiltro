const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const auth = require('../middleware/auth');

router.get('/api/v1/users', /* auth.authenticate() */userController.getAllUsers);

router.post('/api/v1/createUser', userController.createUser);

router.get('/api/v1/updateUser/:_id', userController.updateUser);

router.delete('/api/v1/deleteUser/:_id', userController.deleteUser);

router.post('/register', userController.registerUser);

router.post('/login', userController.login);

module.exports = router;
