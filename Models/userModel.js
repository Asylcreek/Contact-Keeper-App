const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: [true, 'A user must have a unique email address'],
    },
    password: {
        type: String,
        required: [true, ' A user must have a password'],
        minlength: 8,
        select: false,
    },
    dateCreated: Date,
});

userSchema.pre('save', async function(next) {
    if (!this.isNew) return next();

    this.dateCreated = Date.now();

    //Check if password has been hashed
    if (!this.isModified('password')) return next();

    //Hash password
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.methods.comparePasswords = async function(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;