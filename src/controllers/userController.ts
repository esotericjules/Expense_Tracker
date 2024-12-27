import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pool } from '../database/config/db';
import { User } from '../types/user';
import QUERIES from '../queries';
import { handleRequestErrorResponse } from '../helpers';
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  // Implement registration logic
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
    const findUserByEmailQuery = QUERIES.FIND_USER_BY_EMAIL;
    const result = await pool.query(findUserByEmailQuery, [email]);

    if (result.rows.length > 0) {
      return handleRequestErrorResponse(res, 409, 'User already exists');
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user to database
    const createUserQuery = QUERIES.CREATE_USER;
    const newUser = await pool.query(createUserQuery, [
      username,
      email,
      hashedPassword,
    ]);

    const user: User = newUser.rows[0];

    return res.status(201).json({
      message: 'User registered successfully',
      data: {
        ...user,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return handleRequestErrorResponse(res, 500, 'Internal server error');
  }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
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
    const findUserByEmailQuery = QUERIES.FIND_USER_BY_EMAIL;
    const result = await pool.query(findUserByEmailQuery, [email]);

    if (result.rows.length === 0) {
      return handleRequestErrorResponse(res, 404, 'User not found');
    }

    const user: User = result.rows[0];

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
