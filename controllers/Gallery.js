import Galleries from "../models/galleryModel.js";
import GalleriesDetail from "../models/galleryDetailModel.js";
import Destinations from "../models/destinationModel.js";
import Users from "../models/userModel.js";
import path from "path";

// Get all gallery
export const getAllGallery = async (req, res) => {
   try {
      const gallery = await Galleries.findAll({
         include: [
            {
               model: Users,
            },
            {
               model: Destinations
            }
         ],
         order: [
            ['createdAt', 'DESC']
         ],
      });
      res.json(gallery);
   } catch (error) {
      console.log(error);
   }
}

// Get gallery by user
export const getAllGalleryByUser = async (req, res) => {
   try {
      const user = await Users.findOne({
         where: {
            id: req.params.id
         }
      });
      if (user.roleId == 1) {
         const gallery = await Galleries.findAll({
            include: [
               {
                  model: Users,
               },
               {
                  model: Destinations
               }
            ],
            order: [
               ['createdAt', 'DESC']
            ],
         });
         res.json(gallery);
      } else {
         const gallery = await Galleries.findAll({
            where: {
               userId: req.params.id
            },
            include: [
               {
                  model: Users,
               },
               {
                  model: Destinations
               }
            ],
            order: [
               ['createdAt', 'DESC']
            ],
         });
         res.json(gallery);
      }
   } catch (error) {
      console.log(error);
   }
}


// Get gallery by id
export const getGalleryById = async (req, res) => {
   try {
      const gallery = await Galleries.findOne({
         where: {
            id: req.params.id
         },
         include: [
            {
               model: Users,
            },
            {
               model: Destinations
            }
         ]
      });
      res.json(gallery);
   } catch (error) {
      res.json({ msg: "Data tidak tersedia" });
   }
}

// Create gallery
export const createGallery = async (req, res) => {
   const { id, userId, destinationId, title } = req.body;
   try {
      const file = req.files['selectedFiles[]']
      if (file.length >= 2) {
         file.map((value, index) => {
            const fileSize = value.data.length;
            const ext = path.extname(value.name);
            const fileName = value.md5 + ext;
            const url = `${req.protocol}://${req.get("host")}/images/gallery/${fileName}`;
            const allowedType = ['.png', '.jpg', '.jpeg', '.mp4'];

            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
            if (ext != '.mp4') {
               if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran file lebih dari 5 MB!" });
            } else {
               if (fileSize > 50000000) return res.status(422).json({ msg: "Ukuran file lebih dari 50 MB!" });
            }
            value.mv(`./public/images/gallery/${fileName}`, async (err) => {
               if (err) return res.status(500).json({ msg: err.message });
               try {
                  await GalleriesDetail.create({
                     galleryId: id,
                     category: ext != '.mp4' ? 'image' : 'video',
                     filePict: fileName,
                     url
                  });
               } catch (error) {
                  console.log(error.message);
               }
            })
         })
      } else {
         const fileSize = file.data.length;
         const ext = path.extname(file.name);
         const fileName = file.md5 + ext;
         const url = `${req.protocol}://${req.get("host")}/images/gallery/${fileName}`;
         const allowedType = ['.png', '.jpg', '.jpeg', '.mp4'];

         if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
         if (ext != '.mp4') {
            if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran file lebih dari 5 MB!" });
         } else {
            if (fileSize > 50000000) return res.status(422).json({ msg: "Ukuran file lebih dari 50 MB!" });
         }

         file.mv(`./public/images/gallery/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
            try {
               await GalleriesDetail.create({
                  galleryId: id,
                  category: ext != '.mp4' ? 'image' : 'video',
                  filePict: fileName,
                  url
               });
            } catch (error) {
               console.log(error.message);
            }
         })
      }
      await Galleries.create({
         id,
         userId,
         destinationId,
         title
      });
      res.status(201).json({ msg: "Berhasil Menambah Galeri" });
   } catch (error) {
      console.log(error.message);
   }
}

// Update gallery
export const updateGallery = async (req, res) => {
   const gallery = await Galleries.findOne({
      where: {
         id: req.params.id
      }
   });
   if (!gallery) return res.status(404).json({ msg: "No Data Found" });

   const { id, userId, destinationId, category } = req.body;

   try {
      await Galleries.update({
         id,
         userId,
         destinationId,
         category
      }, {
         where: {
            id: req.params.id
         }
      });
      res.json({
         "message": "Galeri Berhasil Diubah"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}

// Delete gallery
export const deleteGallery = async (req, res) => {
   try {
      const data = await Galleries.findOne({
         where: {
            id: req.params.id
         }
      });
      await data.softDelete();
      res.json({
         msg: "Data Berhasil Dihapus"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}