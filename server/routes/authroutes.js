
import express from "express";
import { signup, login, logout } from '../controller/auth.js';
import auth from "../Middlewares/auth.js";

const Authrouter = express.Router();

Authrouter.post('/signup',signup);
Authrouter.post('/login', login);
Authrouter.post('/logout',logout)

export default Authrouter;
