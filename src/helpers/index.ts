import { Response } from 'express';

export const handleRequestErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
): Response => {
  return res.status(statusCode).json({ message });
};
