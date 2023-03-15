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
            }],
            order: [
                ['createdAt', 'DESC'],
                ['destination', 'ASC']
            ]
        });
        res.json(dest);
    } catch (error) {
        console.log(error);
    }
}

// Get all destination by user
export const getAllDestinationByUser = async (req, res) => {
    try {
        const dest = await Destination.findAll({
            where: {
                userId: req.params.id
            },
            include: [
                {
                    model: Users
                }, {
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
                ['createdAt', 'DESC'],
                ['destination', 'ASC']
            ],
        });
        res.json(article);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Create destination
// export const createDestination = async (req, res) => {
//     console.log(req.body)
// }
export const createDestination = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "Tidak ada file yang di Upload." })
    // Insert Destination
    const { id, kdProv, kdKab, category, destination, address, description, embMap, userId } = req.body;
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
                id: id,
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
        console.log('dataFacility', facility);
        try {
            await Facility.create({
                destinationId: id,
                nameFacility: facility
            });
        } catch (error) {
            console.log(error.message);
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
        console.log('data officer', officer);
        try {
            await Officer.create({
                destinationId: id,
                nameOfficer: officer
            });
        } catch (error) {
            console.log(error.message);
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
            console.log(error.message);
        }
    }
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
    try {
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
        
    // Update Facility
    const facilityArr = [];
    const facilityRegexPattern = /\[(\d+)\]\[socialMedia\]/;
    Object.keys(req.body).forEach((key) => {
        const match = key.match(facilityRegexPattern);
        if (match !== null) {
            const index = match[1];
            const idFacility = req.body[`facility[${index}][id]`] || null;
            const destinationId = req.body[`facility[${index}][destinationId]`] || null;
            const facility = req.body[`facility[${index}][nameFacility]`] || null;
            if (idFacility !== null && destinationId !== null && facility !== null) {
                facilityArr[index] = { idFacility, destinationId, facility };
            }
        }
    });

    // Filter out undefined elements from the array
    const filteredFacilitiesArr = facilityArr.filter((elem) => elem !== undefined);
    console.log('dataFacility', filteredFacilitiesArr)
    for (let i = 0; i < filteredFacilitiesArr.length; i++) {
        const { idFacility, destinationId, facility } = facilityArr[i];
        try {
            await Facility.update({
                destinationId,
                nameFacility: facility
             }, {
                where: {
                   id: idFacility
                }
             });
        } catch (error) {
            console.log(error.message);
        }
    }

    // Update Officer
    const officersArr = [];
    const officerRegexPattern = /\[(\d+)\]\[socialMedia\]/;
    console.log('data', req.body)
    Object.keys(req.body).forEach((key) => {
        const match = key.match(officerRegexPattern);
        if (match !== null) {
            const index = match[1];
            const idOfficer = req.body[`officer[${index}][id]`] || null;
            const destinationId = req.body[`officer[${index}][destinationId]`] || null;
            const officer = req.body[`officer[${index}][nameOfficer]`] || null;
            if (idOfficer !== null && destinationId !== null && officer !== null) {
                officersArr[index] = { idOfficer, destinationId, officer };
            }
        }
    });
    
    const filteredOfficersArr = officersArr.filter((elem) => elem !== undefined);
    for (let i = 0; i < filteredOfficersArr.length; i++) {
        const { idOfficer, destinationId, officer } = officersArr[i];
        try {
            await Officer.update({
                destinationId,
                nameOfficer: officer
             }, {
                where: {
                   id: idOfficer
                }
             });
        } catch (error) {
            console.log(error.message);
        }
    }

    // Update Social Media
    const socialMediaArr = [];
    const regexPattern = /\[(\d+)\]\[socialMedia\]/;
    Object.keys(req.body).forEach((key) => {
        const match = key.match(regexPattern);
        if (match !== null) {
            const index = match[1];
            const idSocialMedia = req.body[`socialMedia[${index}][id]`] || null;
            const destinationId = req.body[`socialMedia[${index}][destinationId]`] || null;
            const socialMedia = req.body[`socialMedia[${index}][socialMedia]`] || null;
            const link = req.body[`socialMedia[${index}][link]`] || null;
            if (socialMedia !== null && link !== null) {
                socialMediaArr[index] = { idSocialMedia, destinationId, socialMedia, link };
            }
        }
    });

    const filteredArr = socialMediaArr.filter((elem) => elem !== undefined);
    for (let i = 0; i < filteredArr.length; i++) {
        const { idSocialMedia, destinationId, socialMedia, link } = socialMediaArr[i];
        try {
            await SocialMedia.update({
                destinationId,
                socialMedia,
                link
             }, {
                where: {
                   id: idSocialMedia
                }
             });
        } catch (error) {
            console.log(error.message);
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
    console.log(destination)
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