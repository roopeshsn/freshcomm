const express = require('express')
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)

module.exports = router
