import express from 'express';
import { registerUser, loginUser } from './../controllers/userController';

const userRoutes = express();

userRoutes.post('/register', (req, res) => {
  registerUser(req, res);
});
userRoutes.post('/login', (req, res) => {
  loginUser(req, res);
});

export default userRoutes;
