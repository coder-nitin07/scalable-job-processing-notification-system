FROM node:18-alpine

# 1. Set working directory to service root
WORKDIR /app/api-gateway

# 2. Copy package.json & package-lock.json first
COPY api-gateway/package*.json ./

# 3. Install dependencies
RUN npm install

# 4. Copy shared folder (for aliases)
COPY shared /app/shared

# 5. Copy service code
COPY api-gateway /app/api-gateway

# 6. Expose port
EXPOSE 8000

# 7. Start service
CMD ["npm", "run", "start"]
