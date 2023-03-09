import Article from "../../models/articleModel.js";
import City from "../../models/cityModel.js";
import Destination from "../../models/destinationModel.js"
// import GalleryDetail from "../../models/galleryDetailModel.js";
import Gallery from "../../models/galleryModel.js";
import Officer from "../../models/officerModel.js";
import Province from "../../models/provinceModel.js";

export const getDetailLocation = async (req, res) => {
    try {
        const data = await Destination.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'kdProv', 'destination', 'address', 'url', 'description','embMap'],
        })

        const province = await Province.findOne({
            where: {
                id: data.toJSON().kdProv
            },
        })
        const city = await City.findOne({
            where: {
                id: province.toJSON().id
            },
        })

        // const galleryName = await Gallery.findAll({
        //     where: {
        //         destinationId: req.params.id
        //     },
        // })


        // const getGalleryImage = async (id) => {
        //     const image = await GalleryDetail.findAll({
        //         where: {
        //             galleryId: id
        //         },
        //     })
        //     return image
        // }

        // const galleries = await Promise.all(
        //     galleryName.map(async (gallery) => {
        //         const images = await getGalleryImage(gallery.id);
        //         return {
        //             title: gallery.title,
        //             images: images,
        //         };
        //     })
        // )

        const pengelola = await Officer.findAll({
            where: {
                destinationId: data.toJSON().id
            },
            attributes: ['id', 'nameOfficer']
        })
        const article = await Article.findAll({
            where: {
                destinationId: data.toJSON().id
            },
            attributes: ['id', 'title', 'url']
        })

        return res.json({
            ...data.toJSON(),
            province: province.toJSON().province,
            city: city.toJSON().city,
            // gallery: galleries,
            pengelola: pengelola,
            article: article,
        });
    } catch (error) {
        return res.json(error.message);
    }
}