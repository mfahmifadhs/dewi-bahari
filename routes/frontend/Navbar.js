import express from "express";
import { getHeader, getMenu } from "../../controllers/frontend/Navbar.js";

const routeNavbar = express.Router();

routeNavbar.get('/navbar/menu', getMenu);
routeNavbar.get('/navbar/header', getHeader);

export default routeNavbar;