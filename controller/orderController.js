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
        console.log(organizationId)
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

exports.getOrderList = async (req, res) => {
    try {
       const orderList = await Order.findAll()
       console.log(orderList)
       
       res.status(200).json({
        nessage: `Order list fetched sucessfully`,
        data: orderList
       })
    } catch (error) {
        console.log(error.message),
        res.status(500).json({
            message: `Something went wrong`
        })
    }
}

exports.fullOrderlistByOrg = async (req, res) => {
    try {
        const { organizationId } =req.params;

        const findOrg = await Organisation.findByPk(organizationId);
        if (!findOrg) {
            return res.status(404).json({
                message: `Organisation not found`
            })
        }
        const orderListByOrg = Order.findAll({
            where: {
                organizationId: organizationId
            },
            attributes: ['orderType'],
            include: [{
                model: Delivery,
                as: 'deliveries',
                attributes: ['deliveryProcessedBy', 'deliveryStatus']
            }]
        })

        res.status(200)
    } catch (error) {
        console.log(error.message),
        res.status(500).json({
            message: `Something went wrong`
        })
    }
}