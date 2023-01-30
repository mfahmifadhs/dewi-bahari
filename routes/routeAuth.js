import express from "express";
import { Register, Login, Logout, Me } from "../controllers/Auth.js";

const routeAuth = express.Router();

routeAuth.get('/me', Me);
routeAuth.post('/register', Register);
routeAuth.post('/login', Login);
routeAuth.delete('/logout', Logout);

export default routeAuth;