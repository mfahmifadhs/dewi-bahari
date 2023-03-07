import Destination from "../../models/destinationModel.js"

export const getLocation = async (req, res) => {
    try {
        const data = await Destination.findAll({
            attributes: ['id', 'destination', 'address', 'url'],
        })

        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}