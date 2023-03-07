import express from "express";
import { getDetailLocation } from "../../controllers/frontend/DetailProfil.js";

const routeDetailProfil = express.Router();

routeDetailProfil.get('/profil/detail/:id', getDetailLocation);

export default routeDetailProfil;