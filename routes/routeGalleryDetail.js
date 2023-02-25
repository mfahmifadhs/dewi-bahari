import express from "express";
import { 

 } from "../controllers/Gallery.js";
import { deleteDetailGallery, getDetailGallery, getDetailGalleryById, updateDetailGallery } from "../controllers/GalleryDetail.js";

const routeGalleryDetail = express.Router();

routeGalleryDetail.get('/gd/:id', getDetailGallery);
routeGalleryDetail.get('/gd/detail/:id', getDetailGalleryById);
routeGalleryDetail.patch('/gd/update/:galleryId/:id', updateDetailGallery);
routeGalleryDetail.delete('/gd/:id', deleteDetailGallery);

export default routeGalleryDetail;