import Users from "../models/userModel.js";
import Destination from "../models/destinationModel.js";

// Get all destination
export const getAllDestination = async(req, res) => {
    try {
        const dest = await Destination.findAll({
            include: [{
                model: Users
            }]
        });
        res.json(dest);
    } catch (error) {
        console.log(error);
    }
}

// Get destination by id
export const getDestinationById = async (req, res) => {
   try {
       const dest = await Destination.findAll({
           where: {
               id: req.params.id
           }
       });
       res.json(dest[0]);
   } catch (error) {
       res.json({ message: error.message });
   }
}

// Create destination
export const createDestination = async (req, res) => {
    console.log(req.body)
    try {
        const { kdProv, kdKab, category, destination, address, description, embMap, userId } = req.body;
        await Destination.create({
            kdProv,
            kdKab,
            category,
            destination,
            address,
            description,
            embMap,
            userId,
            isDelete: 'false'
        });
        res.json({
            "message": "Destination Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Update destination
export const updateDestination = async (req, res) => {
    try {
        const { kdProv, kdKab, category, destination, address, description, embMap, userId, isDelete } = req.body;
        await Destination.update({
            kdProv,
            kdKab,
            category,
            destination,
            address,
            description,
            embMap,
            userId,
            isDelete
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Destination Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Delete destination
export const deleteDestination = async (req, res) => {
    try {
        await Destination.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Destination Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}