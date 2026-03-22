const router = require('express').Router()

// write code here
const { logDelivery } = require('../controller/deliveryController')

router.post('/delivery/:orderId', logDelivery)

module.exports = router