FROM node:18-alpine

WORKDIR /app/worker-service

# Copy package.json and install dependencies
COPY worker-service/package*.json ./
RUN npm install

# Copy shared folder and install its dependencies
COPY shared/package*.json ../shared/
RUN cd ../shared && npm install

# Copy code
COPY shared ../shared
COPY worker-service ./ 

EXPOSE 8002

CMD ["npm", "run", "start"]
