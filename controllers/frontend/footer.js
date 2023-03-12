import Component from "../../models/componentModel.js";

export const getAddress = async (req, res) => {
    try {
        const data = await Component.findOne({
            attributes: ['id', 'title', 'description'],
            where: {
                category: 'Footer',
                title: "<p>Address</p>"
            }
        })
        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}
export const getInformation = async (req, res) => {
    try {
        const data = await Component.findAll({
            attributes: ['id', 'title', 'description', 'url'],
            where: {
                category: 'Footer'
            }
        })
        const result = {};
        data.forEach((item) => {
            if (item.title === "<p>Logo</p>") {
                result['logo'] = item.url;
            } else if (item.title === "<p>Instagram</p>") {
                result['instagram'] = item.description;
            } else if (item.title === "<p>Facebook</p>") {
                result['facebook'] = item.description;
            }else if (item.title === "<p>Email</p>") {
                result['email'] = item.description;
            }
        });

        return res.json(result);
    } catch (error) {
        return res.json(error.message);
    }
}