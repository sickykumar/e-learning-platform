//@ts-nocheck
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const { isTokenBlacklisted } = require('../utils/tokenBlacklist');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  //  console.log("AUTH HEADER =>", req.headers.authorization);
  let token;

  // Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Cookie
  else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }

  // Check Blacklist (Immediate Revocation for logged out or compromised tokens)
  const isRevoked = await isTokenBlacklisted(token);
  if (isRevoked) {
    return next(new ErrorHandler('This session has been logged out. Please login again.', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log('DECODED =>', decoded);
  const user = await User.findById(decoded.id);
  // console.log('USER =>', user);
  if (!user) {
    return next(new ErrorHandler('User no longer exists', 401));
  }

  req.user = user;

  next();
});
