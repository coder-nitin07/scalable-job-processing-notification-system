FROM node:18-alpine

WORKDIR /app/api-gateway

# Copy package.json and install dependencies
COPY api-gateway/package*.json ./
RUN npm install

# Copy shared folder and install its dependencies
COPY shared/package*.json ../shared/
RUN cd ../shared && npm install

# Copy code
COPY shared ../shared
COPY api-gateway ./ 

EXPOSE 8000

CMD ["npm", "run", "start"]
