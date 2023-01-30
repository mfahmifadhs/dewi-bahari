import express from "express";
import { createAccess, deleteAccess, getAccessById, getAllAccess, updateAccess } from "../controllers/Access.js";
import { superAdminOnly } from "../middleware/VerifyUser.js";

const routeAccess = express.Router();

routeAccess.get('/ac', getAllAccess);
routeAccess.get('/ac/:id', superAdminOnly, getAccessById);
routeAccess.post('/ac', superAdminOnly, createAccess);
routeAccess.patch('/ac/:id', superAdminOnly, updateAccess);
routeAccess.delete('/ac/:id', superAdminOnly, deleteAccess);

export default routeAccess;