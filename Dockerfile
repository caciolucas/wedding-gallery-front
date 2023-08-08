FROM node:16.17.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm i -D @types/node
COPY . .
CMD ["npm", "run", "build"]