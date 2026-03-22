const {Delivery, Staff, Order} = require('../models')
const fs = require('fs')

exports.logDelivery = async(req, res) =>{
    try {
        const {orderId} = req.params
        const findOrder = await Order.findByPk(orderId)
        if (!findOrder) {
            return res.status(404).json({
                message: `Order with ID:${orderId} not found`
            })
        }

        const {deliveryProcessedBy} = req.body

        const findStaffDetails = await Staff.findAll({
            where: {staffName: deliveryProcessedBy}

            })
        console.log(findStaffDetails)
        const findStaff = findStaffDetails[0].dataValues;
        console.log(`dv`, findStaff)

        const deliveryStatus = 'pending'
        const clothes = findOrder.orderType
        const staffId = findStaff.staffId
        // console.log(staffId)
        const organisationId = findStaff.organisationId
        // console.log(organisationId)

        const newDelivery = {
            deliveryProcessedBy,
            deliveryStatus,
            clothes,
            orderId,
            staffId,
            organisationId
        }
        
        const newLoggedDelivery = await Delivery.create(newDelivery)

        res.status(201).json({
            message: "Delivery logged successfully",
            data: newLoggedDelivery
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

