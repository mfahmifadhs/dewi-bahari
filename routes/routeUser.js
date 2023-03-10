import express from "express";
import { deleteUser, updateUser, getAllUser, getUserById } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { superAdminOnly } from "../middleware/VerifyUser.js";

const routeUser = express.Router();

routeUser.get('/us', getAllUser);
routeUser.get('/us/:id', getUserById);
routeUser.patch('/us/:id', updateUser);
routeUser.delete('/us/:id', deleteUser);

export default routeUser;