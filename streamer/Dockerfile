ARG NODE_VERSION=22.14.0-alpine
FROM node:${NODE_VERSION}


WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 5500

CMD ['node','server.js']