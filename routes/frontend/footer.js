import express from "express";
import { getAddress } from "../../controllers/frontend/footer.js";

const routeFooter = express.Router();

routeFooter.get('/footer/address', getAddress);

export default routeFooter;