import { Request, Response, NextFunction } from 'express';
import he from 'he';

const sanitizeMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string')
      req.body[key] = he.encode(req.body[key]);
  }

  for (const key in req.query) {
    if (typeof req.query[key] === 'string')
      req.query[key] = he.encode(req.query[key]);
  }

  next();
};

export default sanitizeMiddleware;
