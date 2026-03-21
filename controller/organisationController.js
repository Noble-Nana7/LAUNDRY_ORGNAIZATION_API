const {Organisation} = require('../models')
const cloudinary = require('../middlewares/cloudinary')
const fs = require('fs')
exports.createOrganisation = async(req, res) =>{
    try {
        console.log("anything")
        const files = req.file;
        console.log(files)
        const filePath = files['path']

        const uploadToCloudinary = await cloudinary.uploader.upload(filePath,(error, result) => {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
            };})
       
        const response = [{
            secureUrl: uploadToCloudinary.secure_url,
            publicId: uploadToCloudinary.public_id
        }]
        fs.unlinkSync(filePath)

        

        const {organisationName,organisationAddress,organisationEmail,organizationPhoneNumber}= req.body
        // const valEmail = organisationEmail.includes('@') && organisationEmail.includes('.com')
        const newOrgan = await Organisation.create({
            organisationName,
            organisationAddress,
            organisationEmail,
            organizationPhoneNumber,
            organisationLogo: response
        })

        res.status(201).json({
            message: "Organization created successfully",
            data: newOrgan
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}