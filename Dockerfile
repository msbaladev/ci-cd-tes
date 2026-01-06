ARG NODE_VERSION=22.14.0-alpine
FROM node:${NODE_VERSION}

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]





# ARG NODE_VERSION=22.14.0-alpine

# FROM node:${NODE_VERSION} AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# FROM node:${NODE_VERSION}
# WORKDIR /app
# COPY --from=builder /app .
# EXPOSE 3000
# CMD ["npm", "start"]
