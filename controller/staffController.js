const {Staff}=require('../models')
const fs = require('fs')
// const cloudinary = require('../middlewares/cloudinary')
const {sendToCloudinary} = require('../helpers/helper')
 

 exports.addStaff = async (req, res) => {
  try {
    console.log('hello')
    const files = req.files
    console.log(files)
    const response = await sendToCloudinary(files)
    console.log(response)

    await Promise.all(
        files.map(e => fs.unlink(e.path))
    );

    const { name, position, salary, organizationId } = req.body;

    const staffData = {
      name,
      position,
      salary,
      organizationId,
      staffDp: dpResult.secure_url,
      profilePhoto: profileResult.secure_url
    };

    const staff = await staffModel.create(staffData);

    res.status(201).json({
      message: "Staff added successfully",
      data: staff
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};






















// exports.updateStaff = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, position, salary } = req.body;

//     const staff = await staffModel.findByPk(id);

//     if (!staff) {
//       return res.status(404).json({
//         message: "Staff not found"
//       });
//     }

//     let staffData = {
//       name,
//       position,
//       salary
//     };


//     if (req.files && req.files.staffDp) {
//       const result = await cloudinary.uploader.upload(
//         req.files.staffDp[0].path
//       );
//       fs.unlinkSync(req.files.staffDp[0].path);

//       staffData.staffDp = result.secure_url;
//     }

//     if (req.files && req.files.profilePhoto) {
//       const result = await cloudinary.uploader.upload(
//         req.files.profilePhoto[0].path
//       );
//       fs.unlinkSync(req.files.profilePhoto[0].path);

//       staffData.profilePhoto = result.secure_url;
//     }

//     await staff.update(staffData);

//     res.status(200).json({
//       message: "Staff updated successfully",
//       data: staff
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };