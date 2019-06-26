import Sequelize, { Model, DataTypes } from 'sequelize';

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

export class Character extends Model implements ICharacter {
  public id!: number;
  public name!: string;
  public level!: number;
  public race!: string;
  public class!: string;
  public str!: number;
  public dex!: number;
  public con!: number;
  public int!: number;
  public wis!: number;
  public cha!: number
}

export const CharacterAttributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  level: {
    type: Sequelize.INTEGER
  },
  race: {
    type: Sequelize.STRING
  },
  class: {
    type: Sequelize.STRING
  },
  str: {
    type: Sequelize.INTEGER
  },
  dex: {
    type: Sequelize.INTEGER
  },
  con: {
    type: Sequelize.INTEGER
  },
  int: {
    type: Sequelize.INTEGER
  },
  wis: {
    type: Sequelize.INTEGER
  },
  cha: {
    type: Sequelize.INTEGER
  }
};