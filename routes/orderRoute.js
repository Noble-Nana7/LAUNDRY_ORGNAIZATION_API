const router = require('express').Router()

// write code here
const { createOrder, getOrderList, fullOrderlistByOrg } = require('../controller/orderController')
const { upload } = require('../middlewares/multer')

router.post('/order/:staffId', upload.array('orderPicture', 3), createOrder)
router.get('/orders', getOrderList)
router.get('/orders/:organizationId', fullOrderlistByOrg)

module.exports = router