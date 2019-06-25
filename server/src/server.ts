import app from './app';
// import { logger } from './shared/winston-logger';
const PORT = process.env.PORT || 4280;

import http from 'http'

const server = http.createServer(app);

server.listen(PORT);
