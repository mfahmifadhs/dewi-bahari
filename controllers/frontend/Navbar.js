import Menu from "../../models/menuModel.js";
import Component from "../../models/componentModel.js";

export const getMenu = async (req, res) => {
    try {
        const data = await Menu.findAll({
            attributes: ['id', 'menu', 'isDelete'],
            where: {
                isDelete: 'false'
            }
        })

        const addUrl = data.map((index) => {
            if (index.toJSON().menu === 'Galeri') {
                return {
                    ...index.toJSON(),
                    url: `/${index.toJSON().menu.toLowerCase()}`,
                    subMenu: [
                        {
                            nama: "Foto",
                            status: false,
                            url: "/galeri/foto"
                        },
                        {
                            nama: "Video",
                            status: false,
                            url: "/galeri/video"
                        },
                    ]
                }
            }
            else if (index.toJSON().menu === 'Beranda') {
                return { ...index.toJSON(), status: true, url: `/` }
            }
            else {
                return { ...index.toJSON(), status: false, url: `/${index.toJSON().menu.toLowerCase()}` }
            }
        })

        return res.json(addUrl);
    } catch (error) {
        return res.json(error.message);
    }
}
export const getHeader = async (req, res) => {
    try {
        const data = await Component.findOne({
            attributes: ['id', 'title', 'description', 'url'],
            where: {
                category: 'Header'
            }
        })
        return res.json(data);
    } catch (error) {
        return res.json(error.message);
    }
}