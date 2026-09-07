//@ts-nocheck
const User = require('../models/user.model');

const crypto = require('crypto');

const Email = require('../utils/email');

const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const sendToken = require('../utils/sendToken');

const cloudinary = require('../config/cloudinary');

const { blacklistToken } = require('../utils/tokenBlacklist');

// REGISTER USER
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword, phoneNumber, role } = req.body;

  // Check Existing User
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler('User already exists with this email', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
    role,
  });

  sendToken(user, 201, res, 'User Registered Successfully');
});

// LOGIN USER
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check Email & Password
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400));
  }

  // Find User
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  // Compare Password
  const isPasswordMatched = await user.correctPassword(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  sendToken(user, 200, res, 'Login Successful');
});

// LOGOUT USER
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  // Add token to blacklist immediately (Option A: MongoDB TTL + Memory Cache)
  if (token) {
    await blacklistToken(token, req.user?.id || req.user?._id, 'logout');
  }

  res.cookie('jwt', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged Out Successfully',
  });
});

// GET CURRENT USER
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

/*
|--------------------------------------------------------------------------
| Get Logged In User Courses
|--------------------------------------------------------------------------
*/
exports.getMyCourses = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('enrolledCourses');

  console.log(user.enrolledCourses);
  res.status(200).json({
    success: true,
    courses: user.enrolledCourses,
  });
});

/*
|--------------------------------------------------------------------------
| Get Logged In User Profiles
|--------------------------------------------------------------------------
*/

exports.getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('enrolledCourses');

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  user.name = req.body.name || user.name;

  user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

  if (req.file) {
    if (user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    user,
    message: 'Profile updated successfully',
  });
});

/*
|--------------------------------------------------------------------------
| Update Logged In User Login Password
|--------------------------------------------------------------------------
*/

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  const isPasswordMatched = await user.correctPassword(currentPassword, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Current password is incorrect', 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler('Passwords do not match', 400));
  }

  user.password = newPassword;

  await user.save();

  // Invalidate old token on password change
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
  if (token) {
    await blacklistToken(token, user._id, 'password_change');
  }

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});

/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
| User enters email
| Generate temporary password
| Save new password in database
| Send temporary password to email
|--------------------------------------------------------------------------
*/

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Get email from request body
  const { email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check user exists or not
  if (!user) {
    return next(new ErrorHandler('No user found with this email', 404));
  }

  // Generate temporary password
  const tempPassword = crypto.randomBytes(6).toString('hex');

  // Update user password
  user.password = tempPassword;

  // Save user
  await user.save();

  // Send temporary password to user email
  await Email.sendTemporaryPassword(email, tempPassword);

  // Response
  res.status(200).json({
    success: true,
    message: 'Temporary password sent to your email',
  });
});
