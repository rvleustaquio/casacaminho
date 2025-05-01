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
RUN npm install
COPY . .
CMD ["npm", "start", "--", "--host", "0.0.0.0"]

# Production stage
FROM nginx:1.25-alpine AS production
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Configure nginx for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
