import express from "express";
import { getAllArticle, getArticleById, getAllArticleByUser, createArticle, updateArticle, deleteArticle } from "../controllers/Article.js";
import { superAdminOnly } from "../middleware/VerifyUser.js";

const routeArticle = express.Router();

routeArticle.get('/ar', getAllArticle);
routeArticle.get('/ar/us/:id', getAllArticleByUser);
routeArticle.get('/ar/:id', getArticleById);
routeArticle.post('/ar', createArticle);
routeArticle.patch('/ar/:id', updateArticle);
routeArticle.patch('/ar/r/:id', deleteArticle);

export default routeArticle;