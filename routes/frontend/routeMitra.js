import express from "express";
import { getDescription } from "../../controllers/frontend/Mitra.js";

const routeMitra = express.Router();

routeMitra.get('/mitra', getDescription);

export default routeMitra;