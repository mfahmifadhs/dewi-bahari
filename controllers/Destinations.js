import Users from '../models/userModel.js';
import Destination from '../models/destinationModel.js';
import Provinces from '../models/provinceModel.js';
import Cities from '../models/cityModel.js';
import Province from '../models/provinceModel.js';
import Article from '../models/articleModel.js';
import SocialMedia from '../models/socialMedia.js';
import Officer from '../models/officerModel.js';
import Facility from '../models/facilityModel.js';
import path from 'path';
import fs from 'fs';
import { Sequelize } from "sequelize";
import Contact from '../models/contact.js';

// Get all destination
export const getAllDestination = async (req, res) => {
    try {
        const dest = await Destination.findAll({
            include: [{
                model: Province,
                attributes: []
            }, {
                model: Cities,
                attributes: []
            }],
            attributes: [
                // select column yang ingin diambil
                'id',
                'destination',
                'category',
                'address',
                'isApprove',
                [Sequelize.literal('`t_province`.`province`'), 'province_name'],
                [Sequelize.literal('`t_city`.`city`'), 'city_name'],
            ],
            order: [
                ['createdAt', 'DESC']
            ],
        });
        res.json(dest);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Get all destination by user
export const getAllDestinationByUser = async (req, res) => {
    try {
        const dest = await Destination.findAll({
            include: [
                {
                    model: Province,
                }, {
                    model: Cities,
                }
            ],
            order: [
                ['createdAt', 'DESC'],
                ['destination', 'ASC']
            ],
        });
        res.json(dest);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllDestinationUserById = async (req, res) => {
    try {
        const dest = await Destination.findOne({
            include: [
                {
                    model: Province,
                }, {
                    model: Cities,
                }
            ],
            order: [
                ['createdAt', 'DESC'],
                ['destination', 'ASC']
            ],
        });
        res.json(dest);
    } catch (error) {
        res.json({ message: error.message });
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

// Get all article by destination
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
// export const createDestination = async (req, res) => {
//     // console.log(req.body)
// }
export const createDestination = async (req, res) => {
    const API_URL = process.env.REACT_APP_API_URL_LOCAL;
    if (req.files === null) return res.status(400).json({ msg: "Tidak ada file yang di Upload." })
    // Insert Destination
    const { id, kdProv, kdKab, category, destination, address, description, embMap } = req.body;
    const file = req.files.filePict;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${API_URL}images/destination/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran gambar harus kurang dari 5 MB" });

    file.mv(`./public/images/destination/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Destination.create({
                id: id,
                kdProv,
                kdKab,
                category,
                destination,
                address,
                description,
                embMap,
                filePict: fileName,
                url
            });
            res.status(201).json({ msg: "Berhasil Menambah Destinasi Wisata" });
        } catch (error) {
            res.json({ message: error.message });
        }
    })

    // Insert Facility
    const facilityArr = [];
    const facilityRegexPattern = /facility\[(\d+)\]\[value\]/; // change the pattern
    Object.keys(req.body).forEach((key) => {
        const match = key.match(facilityRegexPattern);
        if (match !== null) {
            const index = match[1];
            const facility = req.body[key] || null;
            if (facility !== null) {
                facilityArr[index] = facility;
            }
        }
    });

    // Filter out undefined elements from the array
    const filteredFacilitiesArr = facilityArr.filter((elem) => elem !== undefined);
    for (let i = 0; i < filteredFacilitiesArr.length; i++) {
        const facility = filteredFacilitiesArr[i];
        // console.log('dataFacility', facility);
        try {
            await Facility.create({
                destinationId: id,
                nameFacility: facility
            });
        } catch (error) {
            res.json({ message: error.message });
        }   
    }
    console.log('data', req.body)
    // Insert Contact
    const contactArr = [];
    const contactRegexPattern = /contact\[(\d+)\]\[value\]/; // change the pattern
    Object.keys(req.body).forEach((key) => {
        const match = key.match(contactRegexPattern);
        if (match !== null) {
            const index = match[1];
            const contact = req.body[`contact[${index}][value]`] || null;
            const phoneNumber = req.body[`contactPhoneNum[${index}][value]`] || null;
            if (contact !== null && phoneNumber !== null) {
                contactArr[index] = { contact, phoneNumber };
            }
        }
    });

    // Filter contact
    const filteredContactArr = contactArr.filter((elem) => elem !== undefined);
    for (let i = 0; i < filteredContactArr.length; i++) {
        const { contact, phoneNumber } = contactArr[i];
        try {
            await Contact.create({
                destinationId: id,
                contactName: contact,
                phoneNumber: phoneNumber
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    }

    // Insert Officer
    const officersArr = [];
    const officerRegexPattern = /officer\[(\d+)\]\[value\]/; // change the pattern
    Object.keys(req.body).forEach((key) => {
        const match = key.match(officerRegexPattern);
        if (match !== null) {
            const index = match[1];
            const officer = req.body[`officer[${index}][value]`] || null; // change the key
            if (officer !== null) {
                officersArr[index] = officer;
            }
        }
    });

    // Filter out undefined elements from the array
    const filteredOfficersArr = officersArr.filter((elem) => elem !== undefined);
    for (let i = 0; i < filteredOfficersArr.length; i++) {
        const officer = filteredOfficersArr[i];
        // console.log('data officer', officer);
        try {
            await Officer.create({
                destinationId: id,
                nameOfficer: officer
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    }

    // Insert Social Media
    const socialMediaArr = [];
    const regexPattern = /\[(\d+)\]\[value\]/;
    Object.keys(req.body).forEach((key) => {
        const match = key.match(regexPattern);
        if (match !== null) {
            const index = match[1];
            const socialMedia = req.body[`socialMedia[${index}][value]`] || null;
            const link = req.body[`link[${index}][value]`] || null;
            if (socialMedia !== null && link !== null) {
                socialMediaArr[index] = { socialMedia, link };
            }
        }
    });

    // Filter out undefined elements from the array
    const filteredArr = socialMediaArr.filter((elem) => elem !== undefined);

    for (let i = 0; i < filteredArr.length; i++) {
        const { socialMedia, link } = socialMediaArr[i];
        try {
            await SocialMedia.create({
                destinationId: id,
                socialMedia: socialMediaArr[i].socialMedia,
                link: socialMediaArr[i].link
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    }
}

// Update destination
export const updateDestination = async (req, res) => {
    const API_URL = process.env.REACT_APP_API_URL_LOCAL;
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

    const { kdProv, kdKab, category, destination, address, description, embMap, isApprove } = req.body;
    const url = `${API_URL}images/destination/${fileName}`;
    try {
        await Destination.update({
            kdProv,
            kdKab,
            category,
            destination,
            address,
            description,
            embMap,
            filePict: fileName,
            url: url,
            isApprove
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

    // Update Facility
    const facilityArr = [];
    Object.keys(req.body)
        .filter(key => key.includes('facility'))
        .forEach((key) => {
            const match = key.match(/\[(\d+)\]\[(\w+)\]/);
            if (match !== null) {
                const index = match[1];
                const property = match[2];
                const value = req.body[key] || null;

                if (facilityArr[index] === undefined) {
                    facilityArr[index] = { destinationId: null };
                }
                facilityArr[index][property] = value;
            }
        });

    const filteredFacilityArr = facilityArr.filter((elem) => elem !== undefined);
    for (let i = 0; i < filteredFacilityArr.length; i++) {
        const { id, nameFacility } = facilityArr[i];
        if (id) {
            await Facility.update({
                destinationId: req.params.id,
                nameFacility
            }, {
                where: {
                    id
                }
            });
        } else {
            await Facility.create({
                destinationId: req.params.id,
                nameFacility
            })
        }
    }

    // Update Contact
    const contactArr = [];
    Object.keys(req.body)
        .filter(key => key.includes('contact'))
        .forEach((key) => {
            const match = key.match(/\[(\d+)\]\[(\w+)\]/);
            if (match !== null) {
                const index = match[1];
                const property = match[2];
                const value = req.body[key] || null;

                if (contactArr[index] === undefined) {
                    contactArr[index] = { destinationId: null };
                }
                contactArr[index][property] = value;
            }
        });

    const filteredContactArr = contactArr.filter((elem) => elem !== undefined);
    for (let i = 0; i < filteredContactArr.length; i++) {
        const { id, contactName, phoneNumber } = contactArr[i];
        if (id) {
            await Contact.update({
                destinationId: req.params.id,
                contactName,
                phoneNumber
            }, {
                where: {
                    id
                }
            });
        } else {
            await Contact.create({
                destinationId: req.params.id,
                contactName,
                phoneNumber
            })
        }
    }

    // Update Social Media
    const socialMediaArr = [];
    Object.keys(req.body)
        .filter(key => key.includes('socialMedia'))
        .forEach((key) => {
            const match = key.match(/\[(\d+)\]\[(\w+)\]/);
            if (match !== null) {
                const index = match[1];
                const property = match[2];
                const value = req.body[key] || null;

                if (socialMediaArr[index] === undefined) {
                    socialMediaArr[index] = { destinationId: null };
                }
                socialMediaArr[index][property] = value;
            }
        });

    const filteredSocialMediaArr = socialMediaArr.filter((elem) => elem !== undefined);
    for (let i = 0; i < filteredSocialMediaArr.length; i++) {
        const { id, socialMedia, link } = socialMediaArr[i];
        if (id) {
            await SocialMedia.update({
                destinationId: req.params.id,
                socialMedia,
                link
            }, {
                where: {
                    id
                }
            });
        } else {
            await SocialMedia.create({
                destinationId: req.params.id,
                socialMedia,
                link
            })
        }
    }

    // Update Officer
    const officersArr = [];
    Object.keys(req.body)
        .filter(key => key.includes('officer'))
        .forEach((key) => {
            const match = key.match(/\[(\d+)\]\[(\w+)\]/);
            if (match !== null) {
                const index = match[1];
                const property = match[2];
                const value = req.body[key] || null;

                if (officersArr[index] === undefined) {
                    officersArr[index] = { destinationId: null };
                }
                officersArr[index][property] = value;
            }
        });

    const filteredOfficersArr = officersArr.filter((elem) => elem !== undefined);
    for (let i = 0; i < filteredOfficersArr.length; i++) {
        const { id, nameOfficer } = officersArr[i];
        if (id) {
            await Officer.update({
                destinationId: req.params.id,
                nameOfficer
            }, {
                where: {
                    id
                }
            });
        } else {
            await Officer.create({
                destinationId: req.params.id,
                nameOfficer
            })
        }
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

// Delete Facility
export const deleteFacilityById = async (req, res) => {
    try {
        const data = await Facility.findOne({
            where: {
                id: req.params.id
            }
        });
        await data.softDelete();
        res.json({
            "message": "Data Fasilitas Berhasil Dihapus"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Delete Contact
export const deleteContactById = async (req, res) => {
    try {
        const data = await Contact.findOne({
            where: {
                id: req.params.id
            }
        });
        await data.softDelete();
        res.json({
            "message": "Data Kontak Berhasil Dihapus"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Delete Social Media
export const deleteSocialMediaById = async (req, res) => {
    try {
        const data = await SocialMedia.findOne({
            where: {
                id: req.params.id
            }
        });
        await data.softDelete();
        res.json({
            "message": "Data Sosial Media Berhasil Dihapus"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Delete Officer
export const deleteOfficerById = async (req, res) => {
    try {
        const data = await Officer.findOne({
            where: {
                id: req.params.id
            }
        });
        await data.softDelete();
        res.json({
            "message": "Data Pengelola Berhasil Dihapus"
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
        res.json({ message: error.message });
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
        res.json({ message: error.message });
    }
}

// Approve Destination
export const approveDestination = async (req, res) => {
    const destination = await Destination.findOne({
        where: {
            id: req.params.id
        }
    });
    // console.log(destination)
    if (!destination) return res.status(404).json({ msg: "No Data Found" });

    const { isApprove, note } = req.body;
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

// Get social media by id
export const getSocialMediaById = async (req, res) => {
    try {
        const dest = await SocialMedia.findAll({
            where: {
                destinationId: req.params.id
            }
        });
        res.json(dest);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Get officer media by id
export const getOfficerById = async (req, res) => {
    try {
        const dest = await Officer.findAll({
            where: {
                destinationId: req.params.id
            }
        });
        res.json(dest);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Get officer media by id
export const getFacilityById = async (req, res) => {
    try {
        const dest = await Facility.findAll({
            where: {
                destinationId: req.params.id
            }
        });
        res.json(dest);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Get officer media by id
export const getContactById = async (req, res) => {
    try {
        const dest = await Contact.findAll({
            where: {
                destinationId: req.params.id
            }
        });
        res.json(dest);
    } catch (error) {
        res.json({ message: error.message });
    }
}