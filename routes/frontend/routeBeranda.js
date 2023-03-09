import express from "express";
import { getBanner, getLatestArticle, getLocation } from "../../controllers/frontend/Beranda.js";

const routeBeranda = express.Router();

routeBeranda.get('/beranda/location', getLocation);
routeBeranda.get('/beranda/artikel', getLatestArticle);
routeBeranda.get('/beranda/banner', getBanner);

export default routeBeranda;