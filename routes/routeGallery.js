import express from "express";
import { createGallery, deleteGallery, getGallery, getGalleryById, updateGallery } from "../controllers/Gallery.js";
import { deleteDetailGallery, getDetailGallery, getDetailGalleryById } from "../controllers/GalleryDetail.js";

const routeGallery = express.Router();

routeGallery.get('/gl', getGallery);
routeGallery.post('/gl', createGallery);
routeGallery.get('/gl/detail/:id', getGalleryById);
routeGallery.patch('/gl/:id', updateGallery);
routeGallery.delete('/gl/:id', deleteGallery);

routeGallery.get('/gd/:id', getDetailGallery);
routeGallery.get('/gd/detail/:id', getDetailGalleryById);
routeGallery.patch('/gd/update/:galleryId/:id', updateGallery);
routeGallery.delete('/gd/:id', deleteDetailGallery);

export default routeGallery;