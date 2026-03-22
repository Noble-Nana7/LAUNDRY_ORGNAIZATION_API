const router = require('express').Router();
const { createOrganisation, getOrganisation, getFullOrganisation } = require('../controller/organisationController');
const { upload } = require('../middlewares/multer');

 router.post('/organization', upload.single('organisationLogo'), createOrganisation);
 router.get('/organisations', getOrganisation)
 router.get('/organisations/:organisationId', getFullOrganisation)


 module.exports = router