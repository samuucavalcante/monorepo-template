import type { Request, Response, NextFunction } from "express";

export function responseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json;

  res.json = function (data: unknown) {
    if ((res as unknown as { _hasError: boolean })._hasError) {
      return originalJson.call(this, data);
    }

    const wrapped = {
      success: true,
      data,
    };

    return originalJson.call(this, wrapped);
  };

  next();
}
