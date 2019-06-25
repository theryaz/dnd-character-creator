import { Request, Response, NextFunction } from 'express';
import { logger, verifyJwt } from '../shared';
import { UnauthorizedError } from '../errors';

export async function authentication(req: Request, res: Response, next: NextFunction){
  if(!req.headers.authorization) throw new UnauthorizedError();

  res.locals.clientId = req.headers['x-client-id'];
  const auth = req.headers.authorization;
  const [,token] = auth.split(' '); // Split 'Bearer' from base64 string

  try{
    const decodedToken = await verifyJwt(token)
    logger.info("Decoded Token:", {decodedToken});
    res.locals.jwt = decodedToken.data;
    next();
  }catch(error){
    logger.error("JWT Error:", error);
    next(new UnauthorizedError("Invalid Token"));
  }
}
