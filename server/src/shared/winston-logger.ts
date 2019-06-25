import * as winston_logger from 'winston';

import { loadEnvs } from './load-envs';

let envs = loadEnvs(['LOG_LEVEL'],false);

export const logger = winston_logger.createLogger({
  transports: [
		new (winston_logger.transports.Console)({
			format: winston_logger.format.combine(
				winston_logger.format.colorize(),
				winston_logger.format.simple(),
			),
			level: envs['LOG_LEVEL']
		})
	]
});
