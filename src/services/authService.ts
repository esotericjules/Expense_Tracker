import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../models/userModel';
import {
  User,
  RegisterUserDependencies,
  RegisterUserResponse,
} from '../types/user';
import { USER_MESSAGES, ERROR_MESSAGES } from '../constants/messages';

const secretKey = process.env.JWT_SECRET_KEY || '';

export const validateRegistrationData = (
  username: string,
  email: string,
  password: string,
): { isValid: boolean; message?: string } => {
  if (!username || !email || !password) {
    return {
      isValid: false,
      message: USER_MESSAGES.REGISTER_REQUIRED_FIELDS,
    };
  }

  // TODO: Add email validation using email-validator package

  return { isValid: true };
};

export const registerUserService = ({
  hashPassword,
  findUserByEmail,
  createUser,
}: RegisterUserDependencies) => {
  return async (
    username: string,
    email: string,
    password: string,
  ): Promise<RegisterUserResponse> => {
    try {
      // check if user already exists
      const existingUser: User | null = await findUserByEmail(email);

      if (existingUser) {
        return {
          success: false,
          message: USER_MESSAGES.USER_EXISTS,
        };
      }

      // encrypt password
      const hashedPassword = await hashPassword(password);

      // save user to database
      const newUser: User = await createUser(username, email, hashedPassword);

      return {
        success: true,
        user: newUser,
        message: USER_MESSAGES.REGISTER_SUCCESS,
      };
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR_REGISTERING_USER, error);
      return {
        success: false,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      };
    }
  };
};

export const loginUserService = async (
  email: string,
  password: string,
): Promise<{
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}> => {
  if (!secretKey) {
    console.error(USER_MESSAGES.JWT_SECRET_UNDEFINED);
    return {
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    };
  }

  try {
    const user: User = await findUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: USER_MESSAGES.USER_NOT_FOUND,
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: USER_MESSAGES.INVALID_PASSWORD,
      };
    }

    // Generate JWT token
    const token: string = jwt.sign(
      { userId: user.id, email: user.email },
      secretKey,
      {
        expiresIn: '5h',
      },
    );

    return {
      success: true,
      user,
      token,
    };
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_LOGGING_IN, error);
    return {
      success: false,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };
  }
};
