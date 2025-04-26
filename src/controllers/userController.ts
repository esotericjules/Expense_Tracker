import { Request, Response } from 'express';
import { handleRequestErrorResponse } from '../helpers/controllerValidations';
import { hashPassword } from '../helpers/helpers';
import { findUserByEmail, createUser } from '../models/userModel';
import {
  validateRegistrationData,
  registerUserService,
  loginUserService,
} from '../services/authService';
import { USER_MESSAGES, ERROR_MESSAGES } from '../constants/messages';

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { username, email, password } = req.body;

  const validation = validateRegistrationData(username, email, password);
  if (!validation.isValid) {
    return handleRequestErrorResponse(res, 400, validation.message || '');
  }

  const result = await registerUserService({
    hashPassword,
    findUserByEmail,
    createUser,
  })(username, email, password);

  if (!result.success) {
    return handleRequestErrorResponse(
      res,
      result.message === USER_MESSAGES.USER_EXISTS ? 409 : 500,
      result.message || ERROR_MESSAGES.ERROR_REGISTERING_USER,
    );
  }

  return res.status(201).json({
    message: result.message,
    data: {
      ...result.user,
    },
  });
};

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleRequestErrorResponse(
      res,
      400,
      USER_MESSAGES.LOGIN_REQUIRED_FIELDS,
    );
  }

  const result = await loginUserService(email, password);

  if (!result.success) {
    const statusCode =
      result.message === USER_MESSAGES.USER_NOT_FOUND
        ? 404
        : result.message === USER_MESSAGES.INVALID_PASSWORD
          ? 401
          : 500;

    return handleRequestErrorResponse(res, statusCode, result.message || '');
  }

  return res.status(200).json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    token: result.token,
    data: {
      ...result.user,
    },
  });
};
