const {Staff, Organisation }=require('../models')
const fs = require('fs')

const {sendToCloudinary} = require('../helpers/helper')
 

 exports.addStaff = async (req, res) => {
  try {
    const { organisationId } = req.params

    const findOrg = await Organisation.findByPk(organisationId)
    if (!findOrg) {
        return res.status(404).json({
            message: `Organisation not found`
        })
    }
    console.log(findOrg)
    const files = req.files
    console.log(files)
    const response = await sendToCloudinary(files)
    console.log(response)

    await Promise.all(
        files.map(e => fs.unlinkSync(e.path))
    );

    const { staffName, staffAge, staffPosition, staffSalary } = req.body;

    const staffData = {
      staffName,
      staffAge,
      staffPosition,
      staffSalary,
      organisationId,
      staffProfilePicture: response
    };

    const staff = await Staff.create(staffData);

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

exports.getStaff = async (req, res) => {
  try {
    const staffList = await Staff.findAll()

    res.status(200).json({
      message: `Staff list fetched sucessfully`,
      data: staffList
    })
  } catch (error) {
    console.log(error.message),
    res.status(500).json({
      message: `Something went wrong`
    })
  }
}