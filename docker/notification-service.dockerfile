FROM node:18-alpine

WORKDIR /app/notification-service

COPY notification-service/package*.json ./
RUN npm install

COPY shared /app/shared
COPY notification-service /app/notification-service

EXPOSE 8003

CMD ["npm", "run", "start"]
