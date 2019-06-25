import uuid from 'uuid/v4';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { logger } from '../shared';

const CharacterSchema = new Schema({
  uuid: { type: String, default: uuid },
  name: { type: String },
  level: { type: Number },
  race: { type: String },
  class: { type: String },
  attributes: {
    str: { type: Number },
    dex: { type: Number },
    con: { type: Number },
    int: { type: Number },
    wis: { type: Number },
    cha: { type: Number },
  },
});

CharacterSchema.index({uuid: 1}, {unique: true});

export interface ICharacter extends mongoose.Document{
  uuid: string,
  name: string,
  level: number,
  race: string,
  class: string,
  attributes: {
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
  }
};
export const Character = mongoose.model<ICharacter>('Character', CharacterSchema);

Character.on('index', function() {
  logger.info("Character Indexes Created");
});
