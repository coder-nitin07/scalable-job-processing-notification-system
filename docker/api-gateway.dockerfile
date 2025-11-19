FROM node:18-alpine

WORKDIR /app

COPY api-gateway/package*.json ./
RUN npm install

# Copy shared folder
COPY shared ./shared

# Copy api-gateway source code
COPY api-gateway ./ 

EXPOSE 8000

CMD ["npm", "run", "start"]