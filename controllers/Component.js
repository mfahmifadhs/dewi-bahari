
import Component from '../models/componentModel.js';
import path from 'path';
import fs from 'fs';

// Get all component
export const getAllComponent = async (req, res) => {
   try {
      const data = await Component.findAll();
      res.json(data);
   } catch (error) {
      console.log(error);
   }
}

// Get component by id
export const getComponentById = async (req, res) => {
   try {
      const data = await Component.findOne({
         where: {
            id: req.params.id
         }
      });
      res.json(data);
   } catch (error) {
      res.json({ message: error.message });
   }
}

// Create component
export const createComponent = async (req, res) => {
   const API_URL = process.env.REACT_APP_API_URL_LOCAL;
   const { category, title, description } = req.body;
   try {
      if (req.files) {
         const file = req.files['selectedFiles[]']
         const fileSize = file.data.length;
         const ext = path.extname(file.name);
         const fileName = file.md5 + ext;
         const url = `${API_URL}images/component/${fileName}`;
         const allowedType = ['.png', '.jpg', '.jpeg', '.mp4'];

         if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
         if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran file lebih dari 5 MB!" });

         file.mv(`./public/images/component/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
            try {
               await Component.create({
                  category,
                  title,
                  description,
                  filePict: fileName,
                  url
               });
            } catch (error) {
               console.log(error.message);
            }
         })
      } else {
         try {
            await Component.create({
               category,
               title,
               description,
               filePict: null,
               url: null
            });
         } catch (error) {
            console.log(error.message);
         }
      }

      res.status(201).json({ msg: "Berhasil Menambah Banner" });
   } catch (error) {
      console.log(error.message);
   }
}

// Update component
export const updateComponent = async (req, res) => {
   try {
      const API_URL = process.env.REACT_APP_API_URL_LOCAL;
      const { category, title, description } = req.body;
      const component = await Component.findOne({
         where: {
            id: req.params.id
         }
      });

      if (req.files && component.filePict) {
         let fileName = "";
         let file = "";
         let ext = "";
         if (req.files === null) {
            fileName = component.filePict;
         } else {
            file = req.files.filePict;
            const fileSize = file.data.length;
            ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.png', '.jpg', '.jpeg', '.mp4'];
            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
            if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran file lebih dari 5 MB!" });

            const filepath = `./public/images/component/${component.filePict}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/images/component/${fileName}`, (err) => {
               if (err) return res.status(500).json({ msg: err.message });
            });
         }

         const url = `${API_URL}images/component/${fileName}`;
         await Component.update({
            category,
            title,
            description,
            filePict: fileName,
            url,
         }, {
            where: {
               id: req.params.id
            }
         });
      } else if (component.filePict) {
         await Component.update({
            category,
            title,
            description,
            filePict: component.filePict,
            url: component.url,
         }, {
            where: {
               id: req.params.id
            }
         });
      } else {
         let fileName = ''
         let url = ''
         if (req.files) {
            const file = req.files['filePict']
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            url = `${API_URL}images/component/${fileName}`;
            const allowedType = ['.png', '.jpg', '.jpeg', '.mp4'];

            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
            if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran file lebih dari 5 MB!" });
            file.mv(`./public/images/component/${fileName}`, async (err) => {
               if (err) return res.status(500).json({ msg: err.message });
            })
         }

         try {
            const dataFile = fileName ? fileName : null
            const dataUrl = url ? url : null
            console.log('tes', dataFile)
            await Component.update({
               category,
               title,
               description,
               filePict: dataFile,
               url: dataUrl
            }, {
               where: {
                  id: req.params.id
               }
            });
         } catch (error) {
            console.log(error.message);
         }
      }
      res.json({
         msg: "Data Berhasil Diupdate"
      });
   } catch (error) {
      // console.log(error);
   }
}

// Delete component
export const deleteComponent = async (req, res) => {
   try {
      const data = await Component.findOne({
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