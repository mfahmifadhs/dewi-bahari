import Article from "../../models/articleModel.js";
import City from "../../models/cityModel.js";
import Destination from "../../models/destinationModel.js"
import Facility from "../../models/facilityModel.js";
import GalleryDetail from "../../models/galleryDetailModel.js";
import Gallery from "../../models/galleryModel.js";
import Officer from "../../models/officerModel.js";
import Province from "../../models/provinceModel.js";
import SocialMedia from "../../models/socialMedia.js";
import Users from "../../models/userModel.js";

export const getDetailLocation = async (req, res) => {
    try {
        const data = await Destination.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id','userId', 'kdProv','kdKab', 'destination', 'address', 'url', 'description', 'embMap'],
        })

        const admin = await Users.findOne({
            attributes: ['id','name','phoneNum'],
            where: {
                id: data.toJSON().userId
            },
        })
        const sosmed = await SocialMedia.findAll({
            attributes: ['id','socialMedia','link'],
            where: {
                destinationId: data.toJSON().id
            },
        })
        const facility = await Facility.findAll({
            attributes: ['id','nameFacility'],
            where: {
                destinationId: data.toJSON().id
            },
        })
        const province = await Province.findOne({
            where: {
                id: data.toJSON().kdProv
            },
        })
        const city = await City.findOne({
            where: {
                id: data.toJSON().kdKab
            },
        })

        const nameGallery = ['gallery', 'atraction']

        const galleryName = await Promise.all(
            nameGallery.map(async (item) => {
                const idPerName = await Gallery.findAll({
                    where: {
                        destinationId: req.params.id,
                        nameGallery: item
                    },
                })
                return idPerName
            }))
        // const galleryName = await Gallery.findAll({
        //     where: {
        //         destinationId: req.params.id
        //     },
        //     group: ['nameGallery'],
        // })


        const getGalleryImage = async (id) => {
            const image = await GalleryDetail.findAll({
                where: {
                    galleryId: id
                },
            })
            return image
        }

        const galleries = await Promise.all(
            galleryName.map(async (galleryCategory) => {
                let category = ""
                const images = []
                await Promise.all(galleryCategory.map(async (gallery) => {
                    const data = await getGalleryImage(gallery.id);
                    // console.log(data);
                    category = gallery.nameGallery
                    images.push(data)
                }))
                return {
                    title: category,
                    images: images.flat(),
                };
            })
        )

        const atraction = galleries.flatMap(item => item.title === 'atraction' ? item.images : [])
        const gallery = galleries.flatMap(item => item.title === 'gallery' ? item.images : [])
        // const atraction = galleries.filter((item) => item.title === 'atraction')
        // const gallery = galleries.filter((item) => item.title === 'gallery')

        const officer = await Officer.findAll({
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
        // return res.json(galleries)

        return res.json({
            ...data.toJSON(),
            province: province.toJSON().province,
            city: city.toJSON().city,
            admin: admin,
            sosmed: sosmed,
            facility: facility,
            atraction: atraction,
            gallery: gallery,
            officer: officer,
            article: article,
        });
    } catch (error) {
        return res.json(error.message);
    }
}