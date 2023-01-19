import express from "express";
import { getUsers, Register, Login, Logout, deleteUsers } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { adminOnly } from "../middleware/VerifyUser.js";
import { createMenu, deleteMenu, getAllMenu, getMenuById, updateMenu } from "../controllers/Menus.js";

const routeMenu = express.Router();

routeMenu.get('/', getAllMenu);
routeMenu.get('/:id', getMenuById);
routeMenu.post('/', createMenu);
routeMenu.patch('/:id', updateMenu);
routeMenu.delete('/:id', deleteMenu);

routeMenu.get('/token', refreshToken);
routeMenu.delete('/logout', Logout);

export default routeMenu;