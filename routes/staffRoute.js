const router = require('express').Router()
const{addStaff}=require('../controller/staffController')
const {upload} = require('../middlewares/multer')


router.post('/add-staff/:organisationId',upload.array('staffProfilePicture', 2),addStaff)






module.exports=router