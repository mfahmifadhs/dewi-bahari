import Article from "../../models/articleModel.js";
import Destination from "../../models/destinationModel.js"

export const getLocation = async (req, res) => {
    try {
        const data = await Destination.findAll({
            attributes: ['id', 'destination', 'address', 'url'],
            limit: 5
        })

        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}
export const getLatestArticle = async (req, res) => {
    try {
        const data = await Article.findAll({
            attributes:['id', 'title', 'url'],
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 5
        });

        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}