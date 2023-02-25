import Users from '../models/userModel.js';
import Destination from '../models/destinationModel.js';
import Provinces from '../models/provinceModel.js';
import Cities from '../models/cityModel.js';
import Province from '../models/provinceModel.js';
import Article from '../models/articleModel.js';
import path from 'path';
import fs from 'fs';

// Get all destination
export const getAllDestination = async (req, res) => {
    try {
        const dest = await Destination.findAll({
            include: [{
                model: Users
            }, {
                model: Province,
            }, {
                model: Cities,
            }]
        });
        res.json(dest);
    } catch (error) {
        console.log(error);
    }
}

// Get destination by id
export const getDestinationById = async (req, res) => {
    try {
        const dest = await Destination.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: Users
            }, {
                model: Province,
            }, {
                model: Cities,
            }]
        });
        res.json(dest[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllArticleByDestination = async (req, res) => {
    try {
        const article = await Article.findAll({
            where: {
                destinationId: req.params.id
            },
            include: [
                {
                    model: Destination,
                },
                {
                    model: Users
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
        });
        res.json(article);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Create destination
export const createDestination = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "Tidak ada file yang di Upload." })

    const { kdProv, kdKab, category, destination, address, description, embMap, userId } = req.body;
    const file = req.files.filePict;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/destination/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran gambar harus kurang dari 5 MB" });

    file.mv(`./public/images/destination/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Destination.create({
                kdProv,
                kdKab,
                category,
                destination,
                address,
                description,
                embMap,
                userId,
                filePict: fileName,
                url
            });
            res.status(201).json({ msg: "Berhasil Menambah Destinasi Wisata" });
        } catch (error) {
            console.log(error.message);
        }
    })
}

// Update destination
export const updateDestination = async (req, res) => {
    const dest = await Destination.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!dest) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    if (req.files === null) {
        fileName = dest.filePict;
    } else {
        const file = req.files.filePict;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran gambar harus kurang dari 5 MB" });

        const filepath = `./public/images/destination/${dest.filePict}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/destination/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const { kdProv, kdKab, category, destination, address, description, embMap, userId } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/destination/${fileName}`;
    console.log('body', req.body);
    try {
        console.log('filename', fileName);
        await Destination.update({
            kdProv,
            kdKab,
            category,
            destination,
            address,
            description,
            embMap,
            userId,
            filePict: fileName,
            url: url
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Destination Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Delete destination
export const deleteDestination = async (req, res) => {
    try {
       const data = await Destination.findOne({
          where: {
             id: req.params.id
          }
       });
       await data.softDelete();
       res.json({
          "message": "Data Destinasi Berhasil Dihapus"
       });
    } catch (error) {
       res.json({ message: error.message });
    }
 }

// Get all province
export const getAllProvince = async (req, res) => {
    try {
        const prov = await Provinces.findAll({
            order: [
                ['province', 'ASC']
            ],
        });
        res.json(prov);
    } catch (error) {
        console.log(error);
    }
}
export const getAllCity = async (req, res) => {
    try {
        const city = await Cities.findAll({
            where: {
                provinceId: req.params.id
            },
            include: [{
                model: Provinces
            }],
            order: [
                ['city', 'ASC']
            ],
        });
        res.json(city);
    } catch (error) {
        console.log(error);
    }
}

// Approve Destination
export const approveDestination = async (req, res) => {
    const destination = await Destination.findOne({
       where: {
          id: req.params.id
       }
    });
    if (!destination) return res.status(404).json({ msg: "No Data Found" });
 
    const { isApprove, note } = req.body;
    console.log(req.params.id);
    try {
       await Destination.update({
          isApprove,
          note
       }, {
          where: {
             id: req.params.id
          }
       });
       res.json({
          "message": "Destinasi Wisata Berhasil Disetujui"
       });
    } catch (error) {
       res.json({ message: error.message });
    }
 }