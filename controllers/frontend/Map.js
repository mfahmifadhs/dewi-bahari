import Destination from "../../models/destinationModel.js";
import Province from "../../models/provinceModel.js";

export const getMapData = async (req, res) => {
    try {
        const destination = await Destination.findAll({
            attributes: ['kdProv'],
            group: ['kdProv']
        })

        const result = await Promise.all(destination.map(async (item) => {
            const dataProvince = await Province.findOne({
                where: {
                    id: item.kdProv
                }
            })
            const destinationList = await Destination.findAll({
                attributes: ['id','destination'],
                where: {
                    kdProv: item.kdProv
                }
            })

            return {
                ...item.toJSON(),
                province: dataProvince.province,
                position: JSON.parse(dataProvince.position),
                destinationList: destinationList
            }
        }))


        return res.json(result);
    } catch (error) {
        return res.json(error.message);
    }
}