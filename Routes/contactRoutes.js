const express = require('express');

const authController = require('../Controllers/authController');
const contactController = require('../Controllers/contactController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.use(authController.restrictTo('client', 'admin'));
router
    .route('/')
    .get(contactController.setUserQuery, contactController.getAllContacts)
    .post(contactController.setUserId, contactController.createContact);

router
    .route('/:id')
    .get(contactController.getContact)
    .patch(contactController.updateContact)
    .delete(contactController.deleteContact);

module.exports = router;