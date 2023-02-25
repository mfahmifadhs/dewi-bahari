import express from "express";
import { getAllArticle, getArticleById, getAllArticleByUser, createArticle, updateArticle, deleteArticle, approveArticle } from "../controllers/Article.js";
import { superAdminOnly } from "../middleware/VerifyUser.js";

const routeArticle = express.Router();

routeArticle.get('/ar', getAllArticle);
routeArticle.get('/ar/us/:id', getAllArticleByUser);
routeArticle.get('/ar/:id', getArticleById);
routeArticle.post('/ar', createArticle);
routeArticle.delete('/ar/:id', deleteArticle);
routeArticle.patch('/ar/:id', updateArticle);
routeArticle.patch('/ar/v/:id', approveArticle);

export default routeArticle;