FROM node:18-alpine

WORKDIR /app

COPY job-service/package*.json ./
RUN npm install

COPY shared ./shared
COPY job-service ./

EXPOSE 8001
CMD ["npm", "run", "start"]
