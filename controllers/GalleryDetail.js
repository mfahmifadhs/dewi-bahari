import Gallery from '../models/galleryModel.js';
import GalleryDetail from '../models/galleryDetailModel.js';
import Users from '../models/userModel.js';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import Destination from '../models/destinationModel.js';

// Get data article by gallery id
export const getDetailGallery = async (req, res) => {
   try {
      const data = await GalleryDetail.findAll({
         where: {
            galleryId: req.params.id
         },
         include: [
            {
               model: Gallery,
            }
         ],
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
export const getDetailGalleryById = async (req, res) => {
   try {
      const data = await GalleryDetail.findOne({
         where: {
            id: req.params.id
         },
         include: [
            {
               model: Gallery,
               include: [
                  {
                     model: Destination,
                     required: false,
                     include: [
                        {
                           model: Users
                        }
                     ]
                  }
               ]
            }
         ],
         order: [
            ['createdAt', 'DESC']
         ],
      });
      res.json(data);
   } catch (error) {
      console.log(error);
   }
}

export const updateDetailGallery = async (req, res) => {
   try {
      const { destinationId, nameGallery, title } = req.body;
      // Update Gallery
      await Gallery.update({
         destinationId,
         nameGallery,
      }, {
         where: {
            id: req.params.galleryId
         }
      });

      const detail = await GalleryDetail.findOne({
         where: {
            id: req.params.id
         }
      });

      // Update Detail Gallery
      let fileName = "";
      let file = "";
      let ext = "";
      let url = "";
      if (req.files === null) {
         console.log('true')
         fileName = detail.filePict;
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

         if (nameGallery == 'atraction') {
            const filepath = `./public/images/gallery/atraction/${detail.filePict}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/images/gallery/atraction/${fileName}`, (err) => {
               if (err) return res.status(500).json({ msg: err.message });
            });
      
            url = `${req.protocol}://${req.get("host")}/images/gallery/atraction/${fileName}`;
         } else {
            const filepath = `./public/images/gallery/${detail.filePict}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/images/gallery/${fileName}`, (err) => {
               if (err) return res.status(500).json({ msg: err.message });
            });
      
            url = `${req.protocol}://${req.get("host")}/images/gallery/${fileName}`;
         }
      }

      await GalleryDetail.update({
         galleryId: req.params.galleryId,
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
export const deleteDetailGallery = async (req, res) => {
   try {
      const data = await GalleryDetail.findOne({
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