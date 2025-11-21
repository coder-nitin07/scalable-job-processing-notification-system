FROM node:20

WORKDIR /app/notification-service

# Copy package.json and install dependencies
COPY notification-service/package*.json ./
RUN npm install

# Copy shared folder and install its dependencies
COPY shared/package*.json ../shared/
RUN cd ../shared && npm install

# Copy code
COPY shared ../shared
COPY notification-service ./ 

EXPOSE 8003

CMD ["npm", "run", "start"]
