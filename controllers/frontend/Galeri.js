import City from "../../models/cityModel.js";
import Destination from "../../models/destinationModel.js";
import GalleryDetail from "../../models/galleryDetailModel.js";
import Gallery from "../../models/galleryModel.js";
import Menu from "../../models/menuModel.js";
import Province from "../../models/provinceModel.js";

export const getPhoto = async (req, res) => {
    try {
        const galleryName = await Gallery.findAll({
            attributes: ['id', 'destinationId', 'nameGallery'],
            where: {
                nameGallery: "gallery"
            }
        })
        const getGalleryImage = async (id, destinationId) => {
            const image = await GalleryDetail.findAll({
                where: {
                    galleryId: id,
                    category: 'image'
                },
            })
            const dataDestinasi = await getDestinationInfo(destinationId)
            if (dataDestinasi) {
                const province = await Province.findOne({
                    where: {
                        id: dataDestinasi.toJSON().kdProv
                    },
                })
                const city = await City.findOne({
                    where: {
                        id: dataDestinasi.toJSON().kdKab
                    },
                })
                const result = image.map((item) => {
                    return {
                        ...item.toJSON(),
                        destination: dataDestinasi.toJSON().destination,
                        province: province.toJSON().province,
                        city: city.toJSON().city,
                    }
                })
                return result
            } else {
                const result = image.map((item) => {
                    return {
                        ...item.toJSON(),
                        destination: '',
                        province: '',
                        city: '',
                    }
                })
                return result
            }
        }
        const getDestinationInfo = async (id) => {
            const data = await Destination.findOne({
                where: {
                    id: id,
                    isApprove: true
                },
            })
            return data
        }


        const galleries = await Promise.all(
            galleryName.map(async (gallery) => {
                const data = await getGalleryImage(gallery.id, gallery.destinationId)
                // const dataDestinasi = await getDestinationInfo(gallery.destinationId)
                // const province = await Province.findOne({
                //     where: {
                //         id: dataDestinasi.toJSON().kdProv
                //     },
                // })
                return data
            })
        )
        const filteredGalleries = galleries.filter((item) => item != null)
        // return res.json(galleryName);
        return res.json(filteredGalleries.flat());
    } catch (error) {
        return res.json(error.message);
    }
}
export const getVideo = async (req, res) => {
    try {
        const galleryName = await Gallery.findAll({
            attributes: ['id', 'destinationId', 'nameGallery'],
            where: {
                nameGallery: "gallery"
            }
        })
        const getGalleryImage = async (id, destinationId) => {
            const image = await GalleryDetail.findAll({
                where: {
                    galleryId: id,
                    category: 'video'
                },
            })
            const dataDestinasi = await getDestinationInfo(destinationId)
            if (dataDestinasi) {
                const province = await Province.findOne({
                    where: {
                        id: dataDestinasi.toJSON().kdProv
                    },
                })
                const city = await City.findOne({
                    where: {
                        id: dataDestinasi.toJSON().kdKab
                    },
                })
                const result = image.map((item) => {
                    return {
                        ...item.toJSON(),
                        destination: dataDestinasi.toJSON().destination,
                        province: province.toJSON().province,
                        city: city.toJSON().city,
                    }
                })
                return result
            }else {
                const result = image.map((item) => {
                    return {
                        ...item.toJSON(),
                        destination: '',
                        province: '',
                        city: '',
                    }
                })
                return result
            }
        }
        const getDestinationInfo = async (id) => {
            const data = await Destination.findOne({
                where: {
                    id: id,
                    isApprove: true
                },
            })
            return data
        }


        const galleries = await Promise.all(
            galleryName.map(async (gallery) => {
                const data = await getGalleryImage(gallery.id, gallery.destinationId)

                return data
            })
        )

        // return res.json(galleryName);
        const filteredGalleries = galleries.filter((item) => item != null)
        return res.json(filteredGalleries.flat());
    } catch (error) {
        return res.json(error.message);
    }
}