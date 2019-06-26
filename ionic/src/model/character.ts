export interface ICharacter {
  id: number,
  name: string,
  level: number,
  race: string,
  class: string,
  str: number,
  dex: number,
  con: number,
  int: number,
  wis: number,
  cha: number
};

export interface ICharacterList {
  data: ICharacter[]
}
