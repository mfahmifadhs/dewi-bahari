import express from "express";
import { getTentang } from "../../controllers/frontend/Tentang.js";

const routeTentang = express.Router();

routeTentang.get('/tentang', getTentang);

export default routeTentang;