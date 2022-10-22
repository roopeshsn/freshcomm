const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const sendEmail = require('../utils/email')
const generateToken = require('../utils/generateToken')
const crypto = require('crypto')

// @desc  Auth user and get token
// @route  POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  console.log('logging in')
  if (user && (await user.matchPassword(password))) {
    res
      .cookie('accessToken', generateToken(user._id), {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .end()
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res
      .status(201)
      .cookie('accessToken', generateToken(user._id), {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .end()
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc  Get user profile
// @route  POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { user } = req

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res
      .cookie('accessToken', generateToken(updatedUser._id), {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .end()
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Forgot Password
// @route   PUT /api/users/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(401)
    throw new Error('User not found!')
  }

  const resetToken = user.createPasswordResetToken()
  await user.save()

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/resetpassword/${resetToken}`

  const message = `Forgot your password? Create a new password for you account by visiting this URL: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    })
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.status(500)
    throw new Error('Error sending email!')
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  // decrypt token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (user) {
    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
    })
  } else {
    res.status(400)
    throw new Error('Token is invalid or has expired')
  }
})

// Admin only routes

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const logoutUser = (req, res) => {
  res
    .clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    .end()
}

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser,
}
