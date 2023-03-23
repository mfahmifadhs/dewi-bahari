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
        result.push({ title: "Kementrian / Lembaga", desc: description.toJSON().description })

        const pemda = await Partner.findAll({
            attributes: ['id', 'partner', 'url', 'hyperlink'],
            where: {
                category: 'Pemerintah Daerah'
            }
        })
        result.push({ title: "Pemerintah Daerah", mitra: pemda })

        const NGO = await Partner.findAll({
            attributes: ['id', 'partner', 'url', 'hyperlink'],
            where: {
                category: 'Non-Government Organization'
            }
        })
        result.push({ title: "Non-Government Organization", mitra: NGO })

        const PS = await Partner.findAll({
            attributes: ['id', 'partner', 'url', 'hyperlink'],
            where: {
                category: 'Private Sector'
            }
        })
        result.push({ title: "Private Sector", mitra: PS })

        return res.json(result);
    } catch (error) {
        return res.json(error.message);
    }
}