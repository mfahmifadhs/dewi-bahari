import Menu from "../../models/menuModel.js";

export const getTentang = async (req, res) => {
    try {
        const data = await Menu.findOne({
            attributes: ['description'],
            where: {
                menu: "Tentang"
            }
        })

        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}