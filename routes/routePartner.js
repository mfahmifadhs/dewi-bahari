import express from "express";
import { createPartner, deletePartner, getAllPartner, getPartnerById, updatePartner } from "../controllers/Partners.js";

const routePartner = express.Router();

// Partner = "pt"
routePartner.get('/pt', getAllPartner);
routePartner.get('/pt/:id', getPartnerById);
routePartner.post('/pt', createPartner);
routePartner.patch('/pt/:id', updatePartner);
routePartner.delete('/pt/:id', deletePartner);

export default routePartner;