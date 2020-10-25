const express = require('express');

const authController = require('../Controllers/authController');
const contactController = require('../Controllers/contactController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get(
    '/my-contacts',
    contactController.setUserQuery,
    contactController.getAllContacts
);

router
    .route('/')
    .get(authController.restrictTo('admin'), contactController.getAllContacts)
    .post(contactController.setUserId, contactController.createContact);

router
    .route('/:id')
    .get(authController.restrictTo('admin'), contactController.getContact)
    .patch(contactController.updateContact)
    .delete(contactController.deleteContact);

module.exports = router;