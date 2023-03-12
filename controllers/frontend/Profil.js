import City from "../../models/cityModel.js"
import Destination from "../../models/destinationModel.js"
import Province from "../../models/provinceModel.js"

export const getLocation = async (req, res) => {
    try {
        const data = await Destination.findAll({
            attributes: ['id', 'kdProv', 'kdKab', 'destination', 'url'],
        })

        const result = await Promise.all(
            data.map(async (item) => {
                const province = await Province.findOne({
                    where: {
                        id: item.toJSON().kdProv
                    },
                })
                const city = await City.findOne({
                    where: {
                        id: item.toJSON().kdKab
                    },
                })
                return ({
                    ...item.toJSON(),
                    province: province.toJSON().province,
                    city: city.toJSON().city,
                })
            })
        )

        return res.json(result);
    } catch (error) {
        return res.json(error.message);
    }
}