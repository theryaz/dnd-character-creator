import { logger } from '../shared/winston-logger';
import { Sequelize } from 'sequelize';
import { Character, CharacterAttributes } from './character.model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    logger.debug('Connection has been established successfully.');
    Character.init(CharacterAttributes, { sequelize, tableName: 'character' });
    return Character.sync();
  })
  .catch(err => {
    logger.error('Unable to connect to the database: ' + err);
    process.exit(1);
  });

export { Character } from './character.model';
