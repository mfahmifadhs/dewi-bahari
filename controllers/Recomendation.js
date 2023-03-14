import { Sequelize } from 'sequelize';
import City from '../models/cityModel.js';
import Destination from '../models/destinationModel.js';
import Province from '../models/provinceModel.js';
import Recomendation from '../models/recomendationModel.js';
import Users from '../models/userModel.js';


// Get all recomendation
export const getAllRecomendation = async (req, res) => {
   try {
      const data = await Recomendation.findAll({
         include: [
            {
               model: Destination,
               required: false
            }
         ]
      });
      res.json(data);
   } catch (error) {
      console.log(error);
   }
}
// Get all recomendation
export const getRecomendationById = async (req, res) => {
   try {
      const data = await Recomendation.findOne({
         where: {
            id: req.params.id
         },
         include: [
            {
               model: Destination,
            }
         ]
      });
      res.json(data);
   } catch (error) {
      console.log(error);
   }
}

// Get all destination
export const getAllDestByRc = async (req, res) => {
   try {
      const recomend = await Recomendation.findAll({
         where: {
            destinationId: {
               [Sequelize.Op.not]: null
            }
         }
      })
      const destinationIds = recomend.map((recom) => recom.destinationId);
      const destination = await Destination.findAll({
         where: {
            id: {
               [Sequelize.Op.notIn]: destinationIds
            }
         },
         include: [{
            model: Users
         }, {
            model: Province,
         }, {
            model: City,
         }],
         order: [['destination', 'ASC']]
      });
      console.log('destinasi', destination)
      res.json(destination);
   } catch (error) {
      console.log(error);
   }
}

// Update recomendation
export const updateRecomendation = async (req, res) => {
   try {
      const { destinationId } = req.body
      await Recomendation.update({
         destinationId,
      }, {
         where: {
            id: req.params.id
         }
      });
      res.json({
         "message": "Berhasil Memilih Lokasi Pilihan"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}