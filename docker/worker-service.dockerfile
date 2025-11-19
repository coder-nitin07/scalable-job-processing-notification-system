FROM node:18-alpine

WORKDIR /app

COPY worker-service/package*.json ./
RUN npm install

COPY shared ./shared
COPY worker-service/src ./src

CMD ["node", "src/server.js"]
