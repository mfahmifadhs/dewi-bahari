import express from "express";
import { getLatestArticle, getLocation } from "../../controllers/frontend/Beranda.js";

const routeBeranda = express.Router();

routeBeranda.get('/beranda/location', getLocation);
routeBeranda.get('/beranda/artikel', getLatestArticle);

export default routeBeranda;