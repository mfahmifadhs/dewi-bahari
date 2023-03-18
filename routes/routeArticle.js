import express from "express";
import { getAllArticle, getArticleById, getAllArticleByUser, createArticle, updateArticle, deleteArticle, approveArticle, getAllDestByArticle, getTotalArticleByDestination } from "../controllers/Article.js";
import { superAdminOnly } from "../middleware/VerifyUser.js";

const routeArticle = express.Router();

routeArticle.get('/ar', getAllArticle);
routeArticle.get('/ar/us/:id', getAllArticleByUser);
routeArticle.get('/ar/:id', getArticleById);
routeArticle.get('/ar/dt/all', getAllDestByArticle);
routeArticle.post('/ar', createArticle);
routeArticle.delete('/ar/:id', deleteArticle);
routeArticle.patch('/ar/:id', updateArticle);
routeArticle.patch('/ar/v/:id', approveArticle);
routeArticle.get('/ar/dt/total', getTotalArticleByDestination);

export default routeArticle;