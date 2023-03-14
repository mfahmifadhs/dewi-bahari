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
   getFacilityById, 
   getOfficerById, 
   getSocialMediaById, 
   updateDestination 
} from "../controllers/Destinations.js";
import { 
   getAllDestByRc, 
   getAllRecomendation, 
   getRecomendationById, 
   updateRecomendation 
} from "../controllers/Recomendation.js";
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
// Get social media by dest
routeDestination.get('/sc/dt/:id', getSocialMediaById);
// Get officer by dest
routeDestination.get('/oc/dt/:id', getOfficerById);
// Get facility by dest
routeDestination.get('/fc/dt/:id', getFacilityById);
// Get facility by dest
routeDestination.get('/rc', getAllRecomendation);
routeDestination.get('/rc/:id', getRecomendationById);
routeDestination.patch('/rc/:id', updateRecomendation);
routeDestination.get('/rc/dt/all', getAllDestByRc);

export default routeDestination;