import express from "express";
import { createComponent, deleteComponent, getAllComponent, getComponentById, updateComponent } from "../controllers/Component.js";
import { superAdminOnly } from "../middleware/VerifyUser.js";

const routeComponent = express.Router();

routeComponent.get('/co', getAllComponent);
routeComponent.get('/co/:id', getComponentById);
routeComponent.post('/co', createComponent);
routeComponent.patch('/co/:id', updateComponent);
routeComponent.delete('/co/:id', deleteComponent);

export default routeComponent;