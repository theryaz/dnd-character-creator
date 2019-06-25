import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';

import { logger, asyncWrap } from './shared';

// _ is used as a variable name to ignore the fact that it's not read

// import loadEnvs from './shared/load-envs';
// const envs = loadEnvs([''], false);

const VERSION = require('../package.json').version;

import UserRouter from './routes/user.router';
import CharacterRouter from './routes/character.router';

import { logRoute, authentication } from './middleware';
import { errorHandler } from './errors';

export class App{

	public app: express.Application;
	constructor(){
		this.app = express();
		this.middleware();
		this.routes();
		this.postMiddleware();
	}

	private middleware(): void{
		logger.debug("App loading middleware");
		this.app.use(body_parser.json());
		this.app.use(cors());
		this.app.use(logRoute);
	}
	/*
		HTTP End points
	*/
	private routes(): void{
		logger.debug("App loading routes");
		this.app.get('/healthcheck', (_, res: express.Response) => res.status(200).end());
		this.app.use('/user', UserRouter.router);
		this.app.use('/characters', CharacterRouter.router);
		this.app.get('/', (_, res: express.Response) => {
			res.json({
				result:"DND Character Creator API",
				version: VERSION
			});
		});
		this.app.use(asyncWrap(authentication));
	}

	private postMiddleware(): void{
		this.app.use(errorHandler);
	}
}

export default new App().app;
