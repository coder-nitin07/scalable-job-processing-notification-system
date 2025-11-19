FROM node:18-alpine

WORKDIR /app/worker-service

COPY worker-service/package*.json ./
RUN npm install

COPY shared /app/shared
COPY worker-service /app/worker-service

EXPOSE 8002

CMD ["npm", "run", "start"]
