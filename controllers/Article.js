import Articles from '../models/articleModel.js';
import Destinations from '../models/destinationModel.js';
import Users from '../models/userModel.js';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import Province from '../models/provinceModel.js';
import City from '../models/cityModel.js';
import { Sequelize } from "sequelize";

// Get all article
export const getAllArticle = async (req, res) => {
   try {
      const article = await Articles.findAll({
         include: [
            {
               model: Users,
            },
            {
               model: Destinations,
               required: false
            }
         ],
         attributes: [
             // select column yang ingin diambil
             'id',
             'title',
             'content',
             'isApprove',
             [Sequelize.literal('`t_destination`.`destination`'), 'destination'],
             [Sequelize.literal('`t_user`.`name`'), 'user_name']
         ],
         order: [
            ['createdAt', 'DESC']
         ],
      });
      res.json(article);
   } catch (error) {
      console.log(error);
   }
}

export const getAllArticleByUser = async (req, res) => {
   try {
      const user = await Users.findOne({
         where: {
            id: req.params.id
         }
      });
      
      if (user.roleId == 1) {
         const article = await Articles.findAll({
            include: [
               {
                  model: Users,
                  attributes: []
               },
               {
                  model: Destinations,
                  required: false,
                  attributes: []
               }
            ],
            attributes: [
                // select column yang ingin diambil
                'id',
                'title',
                'content',
                'isApprove',
                [Sequelize.literal('`t_destination`.`destination`'), 'destination'],
                [Sequelize.literal('`t_user`.`name`'), 'user_name']
            ],
            order: [
               ['createdAt', 'DESC']
            ],
         });
         res.json(article);
      } else {
         const article = await Articles.findAll({
            where: {
               userId: req.params.id
            },
            include: [
               {
                  model: Users,
               },
               {
                  model: Destinations,
                  required: false
               }
            ],
            attributes: [
               // select column yang ingin diambil
               'id',
               'title',
               'content',
               'isApprove',
               [Sequelize.literal('`t_destination`.`destination`'), 'destination'],
               [Sequelize.literal('`t_user`.`name`'), 'user_name']
           ],
            order: [
               ['createdAt', 'DESC']
            ],
         });
         res.json(article);
      }
   } catch (error) {
      console.log(error);
   }
}


// Get article by id
export const getArticleById = async (req, res) => {
   try {
      const article = await Articles.findOne({
         where: {
            id: req.params.id
         },
         include: [
            {
               model: Users,
            },
            {
               model: Destinations,
               required: false
            }
         ]
      });
      res.json(article);
   } catch (error) {
      res.json({ msg: "Berhasil membuat artikel, mohon menunggu artikel disetujui oleh admin." });
   }
}

// Create article
export const createArticle = async (req, res) => {
   const API_URL = process.env.REACT_APP_API_URL_LOCAL;
   if (req.files === null) return res.status(400).json({ msg: "Tidak ada file yang di Upload." })

   const { userId, destinationId, title, content, filePict, isApprove } = req.body;
   const file = req.files.filePict;
   const fileSize = file.data.length;
   const ext = path.extname(file.name);
   const fileName = file.md5 + ext;
   const url = `${API_URL}images/article/${fileName}`;
   const allowedType = ['.png', '.jpg', '.jpeg'];

   if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
   if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran gambar harus kurang dari 5 MB" });

   file.mv(`./public/images/article/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
         await Articles.create({
            userId,
            destinationId,
            title,
            content,
            filePict: fileName,
            url,
            isApprove
         });
         res.status(201).json({ msg: "Berhasil Membuat Article" });
      } catch (error) {
         console.log(error.message);
      }
   })
}

// Update article
export const updateArticle = async (req, res) => {
   const API_URL = process.env.REACT_APP_API_URL_LOCAL;
   const article = await Articles.findOne({
      where: {
         id: req.params.id
      }
   });
   if (!article) return res.status(404).json({ msg: "No Data Found" });

   let fileName = "";
   if (req.files === null) {
      fileName = article.filePict;
   } else {
      const file = req.files.filePict;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = ['.png', '.jpg', '.jpeg'];

      if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
      if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran gambar harus kurang dari 5 MB" });

      const filepath = `./public/images/article/${article.filePict}`;
      fs.unlinkSync(filepath);

      file.mv(`./public/images/article/${fileName}`, (err) => {
         if (err) return res.status(500).json({ msg: err.message });
      });
   }

   const { userId, destinationId, title, content, isApprove } = req.body;
   const url = `${API_URL}images/article/${fileName}`;
   const approval = isApprove === 'false' ? null : article.isApprove 

   try {
      await Articles.update({
         userId,
         destinationId,
         title,
         content,
         filePict: fileName,
         url: url,
         isApprove: approval
      }, {
         where: {
            id: req.params.id
         }
      });
      res.json({
         "message": "Artikel Berhasil Diubah"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}

// Approve article
export const approveArticle = async (req, res) => {
   const article = await Articles.findOne({
      where: {
         id: req.params.id
      }
   });
   if (!article) return res.status(404).json({ msg: "No Data Found" });

   const { isApprove, note } = req.body;
   try {
      await Articles.update({
         isApprove,
         note,
      }, {
         where: {
            id: req.params.id
         }
      });
      res.json({
         "message": "Artikel Berhasil Disetujui"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}

// Delete article
export const deleteArticle = async (req, res) => {
   try {
      const data = await Articles.findOne({
         where: {
            id: req.params.id
         }
      });
      await data.softDelete();
      res.json({
         "message": "Data Artikel Berhasil Dihapus"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}

// Get all destination
export const getAllDestByArticle = async (req, res) => {
   try {
      const destination = await Destinations.findAll({
         where: {
            isApprove: true
         },
         include: [{
            model: Users
         }, {
            model: Province,
         }, {
            model: City,
         }],
         order: [
            ['createdAt', 'DESC'],
            ['destination', 'ASC']
         ]
      });
      res.json(destination);
   } catch (error) {
      console.log(error);
   }
}

// Get total article by destination
export const getTotalArticleByDestination = async (req, res) => {
   try {
      const total = await Articles.findAll({
         attributes: [
           [Sequelize.literal('`t_destination`.`destination`'), 'destination'],
           [Sequelize.fn('count', Sequelize.col('t_articles.id')), 'total']
         ],
         include: [{
           model: Destinations,
           attributes: [],
           required: false
         }],
         group: ['destination'],
       });
       res.json(total);  
   } catch (error) {
      console.log(error);
   }
}
