# Build stage
FROM node:22.14.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Development stage
FROM node:22.14.0-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "start:dev"]

# Production stage
FROM node:22.14.0-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
CMD ["npm", "run", "start:prod"]
