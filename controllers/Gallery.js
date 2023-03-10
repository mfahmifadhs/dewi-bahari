import Gallery from '../models/galleryModel.js';
import GalleryDetail from '../models/galleryDetailModel.js';
import Destinations from '../models/destinationModel.js';
import Users from '../models/userModel.js';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Get data article by gallery id
export const getGallery = async (req, res) => {
   try {
      const data = await Gallery.findAll({
         include: [{
            model: Destinations
         }],
         order: [
            ['createdAt', 'DESC']
         ],
      });
      res.json(data);
   } catch (error) {
      console.log(error);
   }
}

// Get data detail article
export const getGalleryById = async (req, res) => {
   try {
      const data = await Gallery.findOne({
         where: {
            id: req.params.id
         },
         include: [{
            model: Destinations
         }],
         order: [
            ['createdAt', 'DESC']
         ],
      });
      res.json(data);
   } catch (error) {
      console.log(error);
   }
}

// Create Gallery
export const createGallery = async (req, res) => {
   const { id, destinationId, nameGallery } = req.body;

   if (nameGallery == 'atraction') {
      const file = req.files['selectedFiles[]']
      if (file.length >= 2) {
         file.map((value, index) => {
            const fileSize = value.data.length;
            const ext = path.extname(value.name);
            const fileName = value.md5 + ext;
            const url = `${req.protocol}://${req.get("host")}/images/gallery/atraction/${fileName}`;
            const allowedType = ['.png', '.jpg', '.jpeg', '.mp4'];

            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
            if (ext != '.mp4') {
               if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran file lebih dari 5 MB!" });
            } else {
               if (fileSize > 50000000) return res.status(422).json({ msg: "Ukuran file lebih dari 50 MB!" });
            }
            value.mv(`./public/images/gallery/atraction/${fileName}`, async (err) => {
               if (err) return res.status(500).json({ msg: err.message });
               const title = req.body[`title[${index}][value]`] || null;
               try {
                  await GalleryDetail.create({
                     galleryId: id,
                     title,
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
         const url = `${req.protocol}://${req.get("host")}/images/gallery/atraction/${fileName}`;
         const allowedType = ['.png', '.jpg', '.jpeg', '.mp4'];

         if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
         if (ext != '.mp4') {
            if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran file lebih dari 5 MB!" });
         } else {
            if (fileSize > 50000000) return res.status(422).json({ msg: "Ukuran file lebih dari 50 MB!" });
         }

         file.mv(`./public/images/gallery/atraction/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
            const title = req.body[`title[${0}][value]`] || null;
            try {
               await GalleryDetail.create({
                  galleryId: id,
                  title,
                  category: ext != '.mp4' ? 'image' : 'video',
                  filePict: fileName,
                  url
               });
            } catch (error) {
               console.log(error.message);
            }
         })
      }

   } 
   
   if (nameGallery == 'gallery') {
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
                  await GalleryDetail.create({
                     galleryId: id,
                     title: null,
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
               await GalleryDetail.create({
                  galleryId: id,
                  title: null,
                  category: ext != '.mp4' ? 'image' : 'video',
                  filePict: fileName,
                  url
               });
            } catch (error) {
               console.log(error.message);
            }
         })
      }
   }

   try {
      await Gallery.create({
         id,
         destinationId,
         nameGallery
      });
      res.status(201).json({ msg: "Berhasil Menambah Galeri" });
   } catch (error) {
      console.log(error.message);
   }

}

// Update Gallery
export const updateGallery = async (req, res) => {
   const gallery = await Gallery.findOne({
      where: {
         id: req.params.id
      }
   });
   console.log(gallery)
   if (!gallery) return res.status(404).json({ msg: "No Data Found" });

   const { destinationId, nameGallery } = req.body;

   try {
      await Gallery.update({
         destinationId,
         nameGallery
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


// Delete Gallery
export const deleteGallery = async (req, res) => {
   try {
      const data = await Gallery.findOne({
         where: {
            id: req.params.id
         }
      });
      await data.softDelete();
      res.json({
         msg: "Data File Berhasil Dihapus"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}