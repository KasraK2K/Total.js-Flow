FROM node:lts-hydrogen

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci