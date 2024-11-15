import express from 'express';
import { registerUser, loginUser } from './../controllers/userController';
import { ROUTES } from './../constants/routes';

const userRoutes = express();

userRoutes.post(ROUTES.REGISTER, (req, res) => {
  registerUser(req, res);
});
userRoutes.post(ROUTES.LOGIN, (req, res) => {
  loginUser(req, res);
});

export default userRoutes;
