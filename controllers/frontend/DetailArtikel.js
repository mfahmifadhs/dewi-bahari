import Article from "../../models/articleModel.js";

export const getDetailArtikel = async (req, res) => {
    try {
        const data = await Article.findOne({
            where: {
                id: req.params.id
            }
        })

        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}
export const getDetailArtikelLainnya = async (req, res) => {
    try {
        const dataArtikel = await Article.findOne({
            where: {
                id: req.params.id
            }
        })
        const data = await Article.findAll({
            where: {
                destinationId: dataArtikel.toJSON().destinationId
            },
            attributes: ['id', 'title', 'url']
        })

        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}