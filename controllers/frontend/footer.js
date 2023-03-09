import Component from "../../models/componentModel.js";

export const getAddress = async (req, res) => {
    try {
        const data = await Component.findOne({
            attributes: ['id', 'title', 'description'],
            where: {
                category: 'Footer'
            }
        })
        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}