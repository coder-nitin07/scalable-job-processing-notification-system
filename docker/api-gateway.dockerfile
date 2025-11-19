FROM node:18-alpine

WORKDIR /app

# install dependencies
COPY api-gateway/package*.json ./
RUN npm install

# copy shared
COPY shared ./shared

# copy service code
COPY api-gateway ./

EXPOSE 8000
CMD ["npm", "run", "start"]
