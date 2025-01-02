import { Request, Response } from 'express';

type fields = string[];
type body = { [key: string]: string | number | boolean | object | null };

export const handleRequestErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
): Response => {
  return res.status(statusCode).json({ message });
};

export const validateRequestBody = (
  fields: fields,
  body: body,
  res: Response,
) => {
  for (const field of fields) {
    if (!body[field]) {
      handleRequestErrorResponse(res, 400, `${field} is required`);
      return false;
    }
  }
  return true;
};

export const validateRequestParams = (
  fields: fields,
  params: body,
  res: Response,
) => {
  for (const field of fields) {
    if (!params[field]) {
      handleRequestErrorResponse(res, 400, `${field} is required`);
      return false;
    }
  }
  return true;
};

export const validateUserAccess = (
  userId: string,
  req: Request,
  res: Response,
): boolean => {
  if (userId !== req.body.user.userId) {
    handleRequestErrorResponse(res, 403, 'Forbidden');
    return false;
  }
  return true;
};
