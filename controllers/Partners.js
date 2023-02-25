import moment from "moment";
import Partner from "../models/partnerModel.js";
import path from "path";
import fs from "fs";

// Get all partner
export const getAllPartner = async (req, res) => {
   try {
      const partners = await Partner.findAll();
      res.json(partners);
   } catch (error) {
      console.log(error);
   }
}

// Get partner by id
export const getPartnerById = async (req, res) => {
   try {
      const partners = await Partner.findAll({
         where: {
            id: req.params.id
         }
      });
      res.json(partners[0]);
   } catch (error) {
      res.json({ message: error.message });
   }
}

// Create partner
export const createPartner = async (req, res) => {
   if (req.files === null) return res.status(400).json({ msg: "Tidak ada file yang di Upload." })

   const { category, partner } = req.body;
   const file = req.files.filePict;
   const fileSize = file.data.length;
   const ext = path.extname(file.name);
   const fileName = file.md5 + ext;
   const url = `${req.protocol}://${req.get("host")}/images/partner/${fileName}`;
   const allowedType = ['.png', '.jpg', '.jpeg'];

   if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
   if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

   file.mv(`./public/images/partner/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
         await Partner.create({
            category,
            partner,
            filePict: fileName,
            url,
         });
         res.status(201).json({ msg: "Berhasil Menambah Mitra Baru" });
      } catch (error) {
         console.log(error.message);
      }
   })
}

// Update partner
export const updatePartner = async (req, res) => {
   const partners = await Partner.findOne({
      where: {
         id: req.params.id
      }
   });
   if (!partners) return res.status(404).json({ msg: "No Data Found" });

   let fileName = "";
   if (req.files === null) {
      fileName = partners.filePict;
   } else {
      const file = req.files.filePict;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = ['.png', '.jpg', '.jpeg'];

      if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
      if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

      const filepath = `./public/images/partner/${partners.filePict}`;
      fs.unlinkSync(filepath);

      file.mv(`./public/images/partner/${fileName}`, (err) => {
         if (err) return res.status(500).json({ msg: err.message });
      });
   }

   const { category, partner } = req.body;
   const url = `${req.protocol}://${req.get("host")}/images/partner/${fileName}`;

   try {
      await Partner.update({
         category,
         partner,
         filePict: fileName,
         url
      }, {
         where: {
            id: req.params.id
         }
      });
      res.json({
         "message": "Data Mitra Berhasil Diubah"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}  

// Delete partner
export const deletePartner = async (req, res) => {
   try {
      const data = await Partner.findOne({
         where: {
            id: req.params.id
         }
      });
      await data.softDelete();
      res.json({
         "message": "Data Mitra Berhasil Dihapus"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}