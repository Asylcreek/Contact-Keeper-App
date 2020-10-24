const validator = require('validator');
const jwt = require('jsonwebtoken');

const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');

const User = require('../Models/userModel');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createAndSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),

        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    };

    res.cookie('jwt', token, cookieOptions);

    //To remove the password field from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        data: {
            user,
        },
    });
};

exports.signup = catchAsync(async(req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return next(new AppError('All fields are required', 400));

    if (!validator.isEmail(email))
        return next(new AppError('Please enter a valid email address', 400));

    if (password.length < 8)
        return next(
            new AppError('Passwords should be at least 8 characters long', 400)
        );

    let user;

    user = await User.findOne({ email });

    if (user) return next(new AppError('User already exists', 400));

    user = await User.create({ name, email, password });

    createAndSendToken(user, 201, req, res);
});

exports.login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new AppError('All fields are required', 400));

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new AppError('Please create an account first', 401));

    if (!(await user.comparePasswords(password, user.password)))
        return next(new AppError('Incorrect password. Please try again.', 401));

    createAndSendToken(user, 200, req, res);
});