import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../types/user';
import { handleRequestErrorResponse } from '../helpers/index';
import { findUserByEmail, createUser } from '../models/userModel';
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return handleRequestErrorResponse(
      res,
      400,
      'Username, email, and password are required',
    );
  }

  try {
    // check if user already exists
    const existingUser: User = await findUserByEmail(email);

    if (existingUser) {
      return handleRequestErrorResponse(res, 409, 'User already exists');
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user to database
    const newUser: User = await createUser(username, email, hashedPassword);

    return res.status(201).json({
      message: 'User registered successfully',
      data: {
        ...newUser,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return handleRequestErrorResponse(res, 500, 'Internal server error');
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { email, password } = req.body;

  if (!secretKey) {
    console.error('JWT secret key is not defined');
    return res.status(500).json({ message: 'Server error' });
  }

  if (!email || !password) {
    return handleRequestErrorResponse(
      res,
      400,
      'Email and password are required',
    );
  }

  try {
    const user: User = await findUserByEmail(email);

    if (!user) {
      return handleRequestErrorResponse(res, 404, 'User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return handleRequestErrorResponse(res, 401, 'Invalid password');
    }

    // Generate JWT token
    const token: string = jwt.sign(
      { userId: user.id, email: user.email },
      secretKey,
      {
        expiresIn: '1h',
      },
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      data: {
        ...user,
      },
    });
    return res;
  } catch (error) {
    console.error('Error logging in:', error);
    return handleRequestErrorResponse(res, 500, 'Internal server error');
  }
};
