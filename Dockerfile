FROM node:20.9-alpine
WORKDIR /usr/app
COPY dist ./dist
COPY node_modules ./node_modules
COPY package*.json ./
COPY .env ./

EXPOSE 28602

CMD node dist/main.js