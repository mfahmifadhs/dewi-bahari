import express from "express";
import { getLocation } from "../../controllers/frontend/Profil.js";

const routeProfil = express.Router();

routeProfil.get('/profil/location', getLocation);

export default routeProfil;