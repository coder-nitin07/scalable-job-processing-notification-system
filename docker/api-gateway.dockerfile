FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY api-gateway/package*.json ./
RUN npm install

# Copy shared dependencies
COPY shared ./shared

# Copy actual service code inside /app/src
COPY api-gateway/src ./src

EXPOSE 8000
CMD ["node", "src/server.js"]
