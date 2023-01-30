import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { superAdminOnly } from "../middleware/VerifyUser.js";
import { createMenu, deleteMenu, getAllMenu, getMenuById, updateMenu } from "../controllers/Menus.js";

const routeMenu = express.Router();

routeMenu.get('/', getAllMenu);
routeMenu.get('/:id', getMenuById);
routeMenu.post('/', createMenu);
routeMenu.patch('/:id', updateMenu);
routeMenu.delete('/:id', deleteMenu);
routeMenu.get('/token', refreshToken);

export default routeMenu;