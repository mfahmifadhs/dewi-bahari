import Gallery from '../models/galleryModel.js';
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

// Create gallery
export const createGallery = async (req, res) => {
   const { destinationId } = req.body;
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
                  await Gallery.create({
                     destinationId,
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
               await Gallery.create({
                  destinationId,
                  category: ext != '.mp4' ? 'image' : 'video',
                  filePict: fileName,
                  url
               });
            } catch (error) {
               console.log(error.message);
            }
         })
      }
      res.status(201).json({ msg: "Berhasil Menambah Galeri" });
   } catch (error) {
      console.log(error.message);
   }
}

export const updateGallery = async (req, res) => {
   try {
      const { destinationId, filePict } = req.body;
      
      const data = await Gallery.findOne({
         where: {
            id: req.params.id
         }
      });

      // Update Detail Gallery
      let fileName = "";
      let file = "";
      let ext = "";
      if (req.files === null) {
         console.log('true')
         fileName = data.filePict;
      } else {
         console.log('false')
         file = req.files.filePict;
         const fileSize = file.data.length;
         ext = path.extname(file.name);
         fileName = file.md5 + ext;
         const allowedType = ['.png', '.jpg', '.jpeg', '.mp4'];
         if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
         if (ext != '.mp4') {
            if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran file lebih dari 5 MB!" });
         } else {
            if (fileSize > 50000000) return res.status(422).json({ msg: "Ukuran file lebih dari 50 MB!" });
         }
         const filepath = `./public/images/gallery/${data.filePict}`;
         fs.unlinkSync(filepath);

         file.mv(`./public/images/gallery/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
         });
      }

      const url = `${req.protocol}://${req.get("host")}/images/gallery/${fileName}`;
      await Gallery.update({
         destinationId,
         category: ext != '.mp4' ? 'image' : 'video',
         filePict: fileName,
         url,
      }, {
         where: {
            id: req.params.id
         }
      });
      res.json({
         msg: "Data Berhasil Diupdate"
      });
   } catch (error) {
      // console.log(error);
   }
}


// Delete detail gallery
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