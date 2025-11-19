FROM node:18-alpine

WORKDIR /app/job-service

COPY job-service/package*.json ./
RUN npm install

COPY shared /app/shared
COPY job-service /app/job-service

EXPOSE 8001

CMD ["npm", "run", "start"]
