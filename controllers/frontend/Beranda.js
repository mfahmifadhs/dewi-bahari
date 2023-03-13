import Article from "../../models/articleModel.js";
import City from "../../models/cityModel.js";
import Component from "../../models/componentModel.js";
import Destination from "../../models/destinationModel.js"
import Province from "../../models/provinceModel.js";

export const getLocation = async (req, res) => {
    try {
        const data = await Destination.findAll({
            attributes: ['id', 'kdProv', 'kdKab', 'destination', 'url'],
            where: {
                isApprove: true
            }
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
export const getLatestArticle = async (req, res) => {
    try {
        const data = await Article.findAll({
            attributes: ['id', 'title', 'url'],
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 5,
            where: {
                isApprove: true
            }
        });

        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}

export const getBanner = async (req, res) => {
    try {
        const data = await Component.findAll({
            where: {
                category: "Banner"
            },
            attributes: ['id', 'category', 'title', 'url'],
        });

        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}
