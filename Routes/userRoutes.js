const express = require('express');

const router = express.Router();

const authController = require('../Controllers/authController');
const userController = require('../Controllers/userController');

const contactRouter = require('./contactRoutes');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect);

router.get('/logout', authController.logout);

router.get('/my-account', userController.getMe, userController.getUser);

router.use('/:userId/contacts', contactRouter);

router.use(authController.restrictTo('admin'));

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;