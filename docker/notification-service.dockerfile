FROM node:18-alpine

WORKDIR /app

COPY notification-service/package*.json ./
RUN npm install

COPY shared ./shared
COPY notification-service ./

EXPOSE 8002
CMD ["npm", "run", "start"]
