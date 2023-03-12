import express from "express";
import { getAddress, getInformation } from "../../controllers/frontend/footer.js";

const routeFooter = express.Router();

routeFooter.get('/footer/address', getAddress);
routeFooter.get('/footer/information', getInformation);

export default routeFooter;