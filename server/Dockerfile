FROM node:12.4-alpine

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4280

CMD [ "npm", "start" ]