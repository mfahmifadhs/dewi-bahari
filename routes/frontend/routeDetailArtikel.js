import express from "express";
import { getDetailArtikel, getDetailArtikelLainnya } from "../../controllers/frontend/DetailArtikel.js";

const routeDetailArtikel = express.Router();

routeDetailArtikel.get('/artikel/:id', getDetailArtikel);
routeDetailArtikel.get('/artikel/:id/lainnya', getDetailArtikelLainnya);

export default routeDetailArtikel;