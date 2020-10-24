const express = require('express');

const router = express.Router();

const authController = require('../Controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get().post();

module.exports = router;