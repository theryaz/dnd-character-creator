import { logger } from '../shared/winston-logger';
import { Character } from '../model/db';
import { ICharacter } from '../model/character.model';

class CharacterController{
  constructor(){}

  async getCharacters(search: string){
    logger.debug('[character.controller.ts] getCharacters search:' + search);
    let query = {};
    if(search){
      let searchRegExp = new RegExp(search, 'ig');
      query = {
        $or:[
          {uuid: searchRegExp},
          {name: searchRegExp},
          {race: searchRegExp},
          {class: searchRegExp},
        ]
      };
    }
    return await Character.find(query);;
  }

  async createCharacter(character: ICharacter){
    logger.debug('[character.controller.ts] createCharacter', character);
    let newCharacter = new Character(character);
    await newCharacter.save();
  }
}

export default new CharacterController();
