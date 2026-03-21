const router = require('express').Router()
const{addStaff}=require('../controller/staffController')
const {upload} = require('../middlewares/multer')


router.post('/add-staff',upload.array('staffDp', 2),addStaff)






module.exports=router