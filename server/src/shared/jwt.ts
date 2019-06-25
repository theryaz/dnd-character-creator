import jwt from 'jsonwebtoken';

import { loadEnvs } from '../shared';

const { JWT_SECRET } = loadEnvs(["JWT_SECRET"], true);


export function verifyJwt(token: string): any{
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if(err || !decodedToken) reject(err);
      else resolve(<any>decodedToken);
    });
  });
}

export function createJwt({sessionData, maxAge}: {sessionData?: Object, maxAge?: number}): any{
  return jwt.sign({
    data: sessionData
  },JWT_SECRET,{
    expiresIn: maxAge,
    algorithm: 'HS256'
  });
}
