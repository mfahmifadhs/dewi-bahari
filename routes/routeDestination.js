import express from "express";
import { 
   approveDestination, 
   createDestination, 
   deleteDestination, 
   getAllArticleByDestination, 
   getAllCity, 
   getAllDestination, 
   getAllDestinationByUser, 
   getAllProvince, 
   getDestinationById, 
   updateDestination 
} from "../controllers/Destinations.js";
import { superAdminOnly } from "../middleware/VerifyUser.js";

const routeDestination = express.Router();

routeDestination.get('/dt', getAllDestination);
routeDestination.get('/dt/us/:id', getAllDestinationByUser);
routeDestination.get('/dt/:id', getDestinationById);
routeDestination.post('/dt', createDestination);
routeDestination.patch('/dt/:id', updateDestination);
routeDestination.delete('/dt/:id', deleteDestination);
routeDestination.patch('/dt/v/:id', approveDestination);

routeDestination.get('/pv', getAllProvince);
// Get cities by prov id
routeDestination.get('/ct/pv/:id', getAllCity);
// Get article by dest
routeDestination.get('/ar/dt/:id', getAllArticleByDestination);

export default routeDestination;