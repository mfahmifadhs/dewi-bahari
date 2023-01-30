import Users from "../models/userModel.js";
import Menu from "../models/menuModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all menu
export const getAllMenu = async(req, res) => {
    try {
        const menus = await Menu.findAll();
        res.json(menus);
    } catch (error) {
        console.log(error);
    }
}

// Get menu by id
export const getMenuById = async (req, res) => {
   try {
       const menus = await Menu.findAll({
           where: {
               id: req.params.id
           }
       });
       res.json(menus[0]);
   } catch (error) {
       res.json({ message: error.message });
   }
}

// Create menu
export const createMenu = async (req, res) => {
    console.log(req.body)
    try {
        const { menu, description, isDelete } = req.body;
        await Menu.create({
            menu: menu,
            description: description,
            isDelete: 'false'
        });
        res.json({
            "message": "Menu Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Update menu
export const updateMenu = async (req, res) => {
    try {
        const { menu, description, isDelete } = req.body;
        await Menu.update({
            menu: menu,
            description: description,
            isDelete: 'false'
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Menu Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Delete menu
export const deleteMenu = async (req, res) => {
    try {
        await Menu.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Menu Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}