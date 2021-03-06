const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A contact must belong to a user'],
    },
    name: {
        type: String,
        required: [true, 'A contact must have a name'],
    },
    email: String,
    phoneNumber: String,
    type: {
        type: String,
        default: 'personal',
        enum: ['personal', 'professional'],
    },
    dateCreated: Date,
});

contactSchema.pre('save', function(next) {
    if (!this.isNew) return next();

    this.dateCreated = Date.now();

    next();
});

contactSchema.pre(/^find/, function(next) {
    const populateOptions = [{ path: 'user', select: '-role -__v -dateCreated' }];

    this.populate(populateOptions);

    next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;