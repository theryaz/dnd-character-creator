import { logger } from '../shared/winston-logger';
import { createJwt, verifyJwt } from '../shared';
import { User } from '../model/db';
import { UnauthorizedError, ForbiddenError } from "../errors";

import { JWT_EXPIRY_SECONDS } from '../model/constants';

export class UserController{
  constructor(){}

  public static async join({email, password}: {email: string, password: string}){
    logger.debug("[User.join]", {email, password: "REDACTED"});
    const user = new User({
      email: email
    });
    user.setPassword(password);
    await user.save();
    return createJwt({
      sessionData:{
        uuid: user.uuid,
        email: user.email,
      },
      maxAge: JWT_EXPIRY_SECONDS
    });
  }

  public static async login({email, password}: {email: string, password: string}){
    logger.info("[User login]", {email, password: "REDACTED"} );
    const user = await User.findOne({email: email});
    logger.info("[User login]", {user} );
    if(user === null) throw new UnauthorizedError();
    if(user.verifyPassword(password) === false) throw new UnauthorizedError("Invalid Password");
    logger.debug("User Authenticated: " + user.email);

    return createJwt({
      sessionData:{
        uuid: user.uuid,
        email: user.email,
      },
      maxAge: JWT_EXPIRY_SECONDS
    });
  }
}
