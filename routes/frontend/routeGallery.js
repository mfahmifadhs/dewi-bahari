import express from "express";
import { getPhoto, getVideo } from "../../controllers/frontend/Galeri.js";

const routeGalleryFront = express.Router();

routeGalleryFront.get('/gallery/photo', getPhoto);
routeGalleryFront.get('/gallery/video', getVideo);

export default routeGalleryFront;