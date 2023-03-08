import express from "express";
import { createGallery, deleteGallery, getGallery, getGalleryById, updateGallery } from "../controllers/Gallery.js";

const routeGallery = express.Router();

routeGallery.get('/gl', getGallery);
routeGallery.post('/gl', createGallery);
routeGallery.get('/gl/detail/:id', getGalleryById);
routeGallery.patch('/gl/:id', updateGallery);
routeGallery.delete('/gl/:id', deleteGallery);

export default routeGallery;