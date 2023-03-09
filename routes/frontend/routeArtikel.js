import express from "express";
import { getAllArticle } from "../../controllers/frontend/Artikel.js";

const routeArtikel = express.Router();

routeArtikel.get('/artikel/all/data', getAllArticle);

export default routeArtikel;