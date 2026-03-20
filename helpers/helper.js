const cloudinary = require('../middlewares/cloudinary')

// an helper function to send files to cloudinary and get the response.
// to use, require it in the controller and pass the files from multer as an argument to the function.
exports.sendToCloudinary = async (files) => {
    try {
        const getFilePath = files.map(file => file.path)
        const sendToCloud = getFilePath.map(async eachFilePath => await cloudinary.uploader.upload(eachFilePath))
        const getCloudResponse = await Promise.all(sendToCloud)
        let responses = [];
        getCloudResponse.forEach((e) => {
            const obj = {
                secureUrl: e.secure_url,
                publicId: e.public_id
            }
            responses.push(obj)
        })
        return responses;
    } catch (error) {
        console.log(error.message),
        res.status(500).json({
            message: `Something went wrong`
        })
    }
}
