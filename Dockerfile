FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1


COPY . .

EXPOSE 8000

CMD ["gunicorn","ci_cd_test.wsgi:application"]





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
