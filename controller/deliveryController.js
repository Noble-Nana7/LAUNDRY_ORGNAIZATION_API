const {Delivery, Staff, Order} = require('../models')
const fs = require('fs')
const orders = require('../models/order')

exports.createDelivery = async(req, res) =>{
    try {
        
        const {orderId} = req.params
        const findOrder = await Order.findByPk(orderId)
        if (!findOrder) {
            return res.status(404).json({
                message: `Order with ID:${orderId} not found`
            })
        }

        const {deliveryProcessedBy} = req.body

        const findStaffDetails = await Staff.findByPk(deliveryProcessedBy)

        const deliveryStatus = 'pending'
        const clothes = findOrder.orderType
        const staffId = findStaffDetails.staffId
        const organisationId = findStaffDetails.organisationId
        const newDelivery = await Delivery.create({
            deliveryProcessedBy,
            deliveryStatus,
            clothes,
            orderId,
            staffId,
            organisationId
        })

        console.log(newDelivery);
        

        res.status(201).json({
            message: "Delivery created successfully",
            data: newDelivery
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}