import Destination from "../../models/destinationModel.js"
import GalleryDetail from "../../models/galleryDetailModel.js";
import Gallery from "../../models/galleryModel.js";

export const getDetailLocation = async (req, res) => {
    try {
        const data = await Destination.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'destination', 'address', 'url'],
        })

        const galleryName = await Gallery.findAll({
            where: {
                destinationId: req.params.id
            },
        })


        const getGalleryImage = async (id) => {
            const image = await GalleryDetail.findAll({
                where: {
                    galleryId: id
                }
            })
            return image
        }
        const gallery = await Promise.all(
            galleryName.map((gallery) => {
                return getGalleryImage(gallery.id)
            })
        )

        return res.json({ ...data.toJSON(), image: gallery });
    } catch (error) {
        return res.json(error.message);
    }
}