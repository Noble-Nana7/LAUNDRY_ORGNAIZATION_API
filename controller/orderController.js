const {Staff, Organisation, Order} = require('../models')
const {sendToCloudinary} = require('../helpers/helper')
const fs = require('fs')

exports.createOrder = async (req, res) => {
    try {
        const { staffId } = req.params;

        const findStaff = await Staff.findByPk(staffId);
        if (!findStaff) {
            return res.status(404).json({
                message: `Staff with ID: ${staffId} not found. check id and try again`
            })
        }
        const files = req.files;
        const response = await sendToCloudinary(files)
        
        console.log(response)

        await Promise.all(
            files.map(e => fs.unlinkSync(e.path))
        )
        const { orderType, orderAmount } = req.body;

        const staffName = findStaff.staffName;
        const organizationId = findStaff.organisationId;
        const orderStatus = 'pending';

        const newOrder = {
            orderType,
            orderAmount,
            orderImage: response,
            orderStatus,
            staffName,
            staffId,
            organizationId
        }

        const loggedOrder = await Order.create(newOrder)

        res.status(201).json({
            message: `Order logged sucessfully`,
            data: loggedOrder
        })

    } catch (error) {
        console.log(error.message),
        res.status(500).json({
            message: `Unable to log order. Something went wrong. Please try again`
        })
    }
}