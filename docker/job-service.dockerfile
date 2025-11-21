FROM node:20

WORKDIR /app/job-service

# Copy package.json and install dependencies
COPY job-service/package*.json ./
RUN npm install

# Copy shared folder and install its dependencies
COPY shared/package*.json ../shared/
RUN cd ../shared && npm install

# Copy code
COPY shared ../shared
COPY job-service ./ 

EXPOSE 8001

CMD ["npm", "run", "start"]
