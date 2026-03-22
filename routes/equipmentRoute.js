const router = require('express').Router()
const {upload} = require('../middlewares/multer')

// write code here
const { logEquipment, getEquipments } = require('../controller/equipmentController')

router.post('/equipment/:organisationId', upload.array('equipmentPicture', 3), logEquipment)
router.get('/equipments', getEquipments)

module.exports = router