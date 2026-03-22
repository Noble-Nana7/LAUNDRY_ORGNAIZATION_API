const router = require('express').Router()

// write code here
const { createDelivery } = require('../controller/deliveryController')

router.post('/delivery/:organisationId', createDelivery)

module.exports = router