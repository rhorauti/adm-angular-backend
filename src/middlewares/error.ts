import { NextFunction, Request, Response } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
}

export const handleErrorMiddleware = async (
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response> => {
  if (!error.statusCode) error.statusCode = 500;
  if (!error.message) error.message = 'Erro interno do servidor';
  return response.status(error.statusCode).json({
    status: false,
    msg: error.message,
  });
};
