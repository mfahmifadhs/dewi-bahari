import Users from '../models/userModel.js';
import Roles from '../models/roleModel.js';
import Destination from '../models/destinationModel.js';
import bcrypt from 'bcrypt';

// Get all user
export const getAllUser = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'phoneNum', 'address'],
            include: [{
                model: Roles
            }, {
                model: Destination,
                required: false,
            }]
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

// Get user by id
export const getUserById = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: Roles
            }]
        });
        res.json(users[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Update user
export const updateUser = async (req, res) => {
    try {
        const { roleId, destinationId, email, name, phoneNum, address, password, newPassword } = req.body;
        if (password) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(newPassword, salt);
            await Users.update({
                password: hashPassword,
                passwordText: newPassword
            }, {
                where: {
                    id: req.params.id
                }
            });
        } else {
            await Users.update({
                roleId,
                destinationId,
                email,
                name,
                phoneNum,
                address,
            }, {
                where: {
                    id: req.params.id
                }
            });
        }
        res.status(201).json({ msg: "Informasi User Berhasil Diperbarui" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const data = await Users.findOne({
            where: {
                id: req.params.id
            }
        });
        await data.softDelete();
        res.status(201).json({ msg: "Berhasil Menghapus Data User" });
    } catch (error) {
        res.json({ message: error.message });
    }
}
