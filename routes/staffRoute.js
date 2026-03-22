const router = require('express').Router()
const{addStaff, getStaff} = require('../controller/staffController')
const {upload} = require('../middlewares/multer')


router.post('/add-staff/:organisationId',upload.array('staffProfilePicture', 2),addStaff)
router.get('/staffs', getStaff)


module.exports=router