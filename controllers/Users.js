import Users from "../models/userModel.js";
import Roles from "../models/roleModel.js";

// Get all user
export const getAllUser = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'phoneNum', 'address'],
            include: [{
                model: Roles
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
            }
        });
        res.json(users[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Update user
export const updateUser = async (req, res) => {
    try {
        const { roleId, email, name, phoneNum, address } = req.body;
        await Users.update({
            roleId,
            email,
            name,
            phoneNum,
            address,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Delete user
export const deleteUsers = async (req, res) => {
    try {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Users Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
