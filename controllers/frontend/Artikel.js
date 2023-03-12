import Article from "../../models/articleModel.js";

export const getAllArticle = async (req, res) => {
    try {
        const data = await Article.findAll({
            attributes: ['id', 'title', 'content','url'],
            order: [
                ['createdAt', 'DESC']
             ],
        })

        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}