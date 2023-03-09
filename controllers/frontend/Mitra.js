import Menu from "../../models/menuModel.js";
import Partner from "../../models/partnerModel.js";

export const getDescription = async (req, res) => {
    try {
        let result = []
        const description = await Menu.findOne({
            attributes: ['id', 'description'],
            where: {
                menu: 'Mitra'
            }
        })
        result.push({title: "Kementrian / Lembaga", desc: description.toJSON().description})
        
        const mitra = await Partner.findAll({
            attributes: ['id', 'partner', 'url'],
            where: {
                category: 'Pemerintah Daerah'
            }
        })
        result.push({title: "Pemerintah Daerah", mitra: mitra})
        
        return res.json(result);
    } catch (error) {
        return res.json(error.message);
    }
}