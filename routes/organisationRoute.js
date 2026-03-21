const router = require('express').Router();
const { createOrganisation } = require('../controller/organisationController');
const { upload } = require('../middlewares/multer');

 router.post('/organization', upload.single('organisationLogo'), createOrganisation);


 module.exports = router