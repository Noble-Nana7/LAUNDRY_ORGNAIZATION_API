const {Organisation, Equipments} = require('../models')
const {sendToCloudinary} = require('../helpers/helper')
const fs = require('fs')

exports.logEquipment = async (req, res) => {
    try {
        const { organisationId } = req.params;

        const findOrg = await Organisation.findByPk(organisationId)
        if (!findOrg) {
            return res.status(404).json({
                message: `Organisation not found. Check Id and try again`
            })
        }

        const files = req.files
        const response = await sendToCloudinary(files)
        
        const { equipmentName, equipmentPrice, equipmentExpiryDate } = req.body;

        const equipmentStatus = 'available';

        const newEquipment = {
            equipmentName,
            equipmentPrice,
            equipmentExpiryDate,
            equipmentStatus,
            equipmentImage: response,
            organisationId
        }

        const newLoggedEquipment = await Equipments.create(newEquipment)

        res.status(201).json({
            message: `New Equipment Logged sucessfully`,
            data: newLoggedEquipment
        })
    } catch (error) {
        console.log(error.message),
        res.status(500).json({
            message: `Cannot log Equipment, Please try again.`
        })
    }
}

exports.getEquipments = async (req, res) => {
    try {
        const equipmentList = await Equipment.findAll()

        res.status(200).json({
            message: `Equipment list fetched sucessfully`,
            data: equipmentList
        })
    } catch (error) {
        console.log(error.message),
        res.status(500).json({
            message: `Cannot get Equipment list, Please try again`
        })
    }
}