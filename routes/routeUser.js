import express from "express";
import { getUsers, Register, Login, Logout, deleteUsers } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { adminOnly } from "../middleware/VerifyUser.js";

const routeUser = express.Router();

routeUser.get('/', verifyToken, getUsers);
routeUser.post('/', Register);
routeUser.post('/login', Login);
routeUser.get('/token', refreshToken);
routeUser.delete('/logout', Logout);
routeUser.delete('/us/:id', verifyToken, deleteUsers);

export default routeUser;