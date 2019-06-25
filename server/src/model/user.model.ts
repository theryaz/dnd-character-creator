import uuid from 'uuid/v4';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { logger, sha512, randomString } from '../shared';
import { SALT_LENGTH } from './constants';

const UserSchema = new Schema({
  uuid: { type: String, default: uuid },
  name: { type: String },
  email: { type: String },
  password: {
    hash: { type: String },
    salt: { type: String }
  },
  meta:{
    emailVerified: { type: Boolean, default: false },
    created: { type: Date, default: new Date()}
  }
});
UserSchema.methods.setPassword = function(password: string): void{
  this.password.salt = randomString(SALT_LENGTH);
  this.password.hash = sha512(password, this.password.salt);
}
UserSchema.methods.verifyPassword = function(verify_password: string): boolean{
  let verifyHash = sha512(verify_password, this.password.salt);
  return verifyHash === this.password.hash;
}
UserSchema.index({uuid: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true, collation: { locale: 'en', strength: 2}});

export interface IUser extends mongoose.Document{
  uuid: string,
  name: string,
  email: string,
  password: {
    hash: string,
    salt: string,
  },
  meta:{
    emailVerified: boolean,
    created: Date,
  }
  setPassword: (password: string) => void,
  verifyPassword: (password: string) => boolean,
};
export const User = mongoose.model<IUser>('User', UserSchema);

User.on('index', function() {
  logger.info("User Indexes Created");
});
