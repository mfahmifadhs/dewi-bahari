import express from "express";
import { getMapData } from "../../controllers/frontend/Map.js";

const routeMap = express.Router();

routeMap.get('/map/data', getMapData);

export default routeMap;