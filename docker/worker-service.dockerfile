FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ../shared ./shared
COPY ./ ./


CMD ["npm", "run", "start"]
