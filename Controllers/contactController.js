const Contact = require('../Models/contactModel');
const factory = require('./handlerFactory');

exports.getAllContacts = factory.getAll(Contact);

exports.getContact = factory.getOne(Contact);

exports.createContact = factory.createOne(Contact);

exports.updateContact = factory.updateOne(Contact);

exports.deleteContact = factory.deleteOne(Contact);

exports.setUserQuery = (req, res, next) => {
    if (req.params.userId) req.query.userId = req.params.userId;

    next();
};

exports.setUserId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user._id;

    next();
};