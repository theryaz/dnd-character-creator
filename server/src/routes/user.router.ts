import * as express from 'express';

import { sanitizeBody, sanitizeQuery, sanitizeParams } from '../middleware'

import { logger } from '../shared/winston-logger';
import { asyncWrap } from '../shared/async-wrap';
// import loadEnvs from '../shared/load-envs';
// const envs = loadEnvs([]);

import { UserController } from '../controllers/user.controller';

export class UserRouter{
	public router: express.Router;
	constructor(){
		logger.debug("Loading User Router");
		this.router = express.Router();
		this.middleware();
		this.routes();
	}
	private middleware(){
		this.router.use(sanitizeBody);
	}
	private routes(){
		this.router.route("/join")
			.post(asyncWrap(async (req, res) => {
				let email = req.body.email;
				let password = req.body.password;
				let token = await UserController.join({email, password});
				res.json({result: token});
			}));
		this.router.route("/login")
			.post(asyncWrap(async (req, res) => {
				let email = req.body.email;
				let password = req.body.password;
				let token = await UserController.login({email, password});
				res.json({result: token});
			}));
	}
}

export default new UserRouter();
