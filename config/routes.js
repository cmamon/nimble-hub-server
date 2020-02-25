const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js');

// Users routes
router.get('/', userController.list);
router.get('/:email', userController.getUserByEmail);

router.post('/signup', userController.register);
router.post('/login', userController.login);

router.delete('/:email', userController.deleteUser);

module.exports = router;
