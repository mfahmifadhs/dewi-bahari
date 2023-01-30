import express from "express";
import { createDestination, deleteDestination, getAllDestination, getDestinationById, updateDestination } from "../controllers/Destinations.js";
import { superAdminOnly } from "../middleware/VerifyUser.js";

const routeDestination = express.Router();

routeDestination.get('/dt', getAllDestination);
routeDestination.get('/dt/:id', getDestinationById);
routeDestination.post('/dt', createDestination);
routeDestination.patch('/dt/:id', updateDestination);
routeDestination.delete('/dt/:id', deleteDestination);

export default routeDestination;