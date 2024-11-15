import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (err) {
    console.error('Error in registration:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ where: { email } });
  // Check if password is correct
  let validPassword = null;
  if (user) {
    validPassword = await bcrypt.compare(password, user.password);
  }

  // Validate required fields
  if (!email || !password || !user || !validPassword) {
    return res
      .status(400)
      .json({ error: 'Your username or password is incorrect' });
  }

  return res.status(200).json({ message: 'Login successful' });
};
