import { logger } from '../shared/winston-logger';
import { Character } from '../model/db';
import { ICharacter } from '../model/character.model';

class CharacterController{
  constructor(){}

  async getCharacters(){
    logger.debug('[character.controller.ts] getCharacters');
    return await Character.findAll();
  }

  async createCharacter(character: ICharacter){
    logger.debug('[character.controller.ts] createCharacter', character);
    await Character.create(character);
  }
}

export default new CharacterController();
