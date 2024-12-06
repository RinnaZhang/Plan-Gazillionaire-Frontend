# Build stage
FROM node:16-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build application
RUN npm run build

# Runtime stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Update nginx default configuration
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

# Expose port (optional, useful if others are reading your Dockerfile)
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
