const express = require('express')
const router = express.Router()
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require('../controllers/orderControllers')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').post(protect, addOrderItems).get(protect)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

module.exports = router
