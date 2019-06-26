import * as express from 'express';

import { sanitizeBody } from '../middleware'

import { logger } from '../shared/winston-logger';
import { asyncWrap } from '../shared/async-wrap';

import CharacterController  from '../controllers/character.controller';

export class CharacterRouter{
	public router: express.Router;
	constructor(){
		logger.debug("Loading Character Router");
		this.router = express.Router();
		this.middleware();
		this.routes();
	}
	private middleware(){
		this.router.use(sanitizeBody);
	}
	private routes(){
		this.router.route("/")
			.get(asyncWrap(async (req, res) => {
				let characters = await CharacterController.getCharacters();
				res.json({data: characters});
			}));
		this.router.route("/")
			.post(asyncWrap(async (req, res) => {
				const character = req.body;
				await CharacterController.createCharacter(character);
				res.json({data: "ok"});
			}));
	}
}

export default new CharacterRouter();
