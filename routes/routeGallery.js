import express from "express";
import { createGallery, deleteGallery, getAllGallery, getAllGalleryByUser, getGalleryById, updateGallery } from "../controllers/Gallery.js";

const routeGallery = express.Router();

routeGallery.get('/gl', getAllGallery);
routeGallery.get('/gl/us/:id', getAllGalleryByUser);
routeGallery.get('/gl/:id', getGalleryById);
routeGallery.post('/gl', createGallery);
routeGallery.patch('/gl/:id', updateGallery);
routeGallery.delete('/gl/:id', deleteGallery);

export default routeGallery;