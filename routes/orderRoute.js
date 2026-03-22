const router = require('express').Router()

// write code here
const { createOrder } = require('../controller/orderController')
const { upload } = require('../middlewares/multer')

router.post('/order/:staffId', upload.array('orderPicture', 3), createOrder)

module.exports = router