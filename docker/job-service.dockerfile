FROM node:18-alpine

WORKDIR /app

COPY job-service/package*.json ./
RUN npm install

COPY shared ./shared
COPY job-service/src ./src
COPY job-service/prisma ./prisma

EXPOSE 8001
CMD ["node", "src/server.js"]
