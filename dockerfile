FROM node:lts-hydrogen

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci

CMD npm run migrate && npm run seed