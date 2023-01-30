import Access from "../models/accessModel.js";
import Menus from "../models/menuModel.js";
import Users from "../models/userModel.js";

// Get all access
export const getAllAccess = async (req, res) => {
    try {
        const access = await Access.findAll({
            attributes: ['id', 'isCreate', 'isRead', 'isUpdate', 'isDelete'],
            include: [
                {
                    model: Users,
                },
                {
                    model: Menus
                }
            ]
        });
        res.json(access);
    } catch (error) {
        console.log(error);
    }
}

// Get access by id
export const getAccessById = async (req, res) => {
    try {
        const access = await Access.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Users,
                },
                {
                    model: Menus
                }
            ]
        });
        res.json(access);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Create access
export const createAccess = async (req, res) => {
    const access = await Access.findOne({
        where: {
            menuId: req.body.menuId,
            userId: req.body.userId,
        }
    });
    if (access) return res.status(404).json({ msg: "Akses user pada menu ini telah dibuat" });
    const { menuId, userId, isCreate, isRead, isUpdate, isDelete } = req.body;

    try {
        await Access.create({
            menuId,
            userId,
            isCreate,
            isRead,
            isUpdate, 
            isDelete
        });
        res.status(201).json({ msg: "Berhasil menambahkan akses user" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update user
export const updateAccess = async (req, res) => {
    try {
        const access = await Access.findOne({
            where: {
                menuId: req.body.menuId,
                userId: req.body.userId,
            }
        });
        if (access) return res.status(404).json({ msg: "Akses user pada menu ini telah ada" });
        const { menuId, userId, isCreate, isRead, isUpdate, isDelete } = req.body;
        await Access.update({
            menuId,
            userId,
            isCreate,
            isRead,
            isUpdate, 
            isDelete
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Access Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Delete user
export const deleteAccess = async (req, res) => {
    try {
        await Access.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Access Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}