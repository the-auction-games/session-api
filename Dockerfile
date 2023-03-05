# Build stage
FROM node:lts AS builder
# Set build directory
WORKDIR /build
# Copy application
COPY . .
# Install all dependencies
RUN npm install
# Build application
RUN npm run build

# Production stage
FROM node:lts-slim
# Set working directory
WORKDIR /app
# Copy application & install prod dependencies
COPY package.json .
RUN npm install --omit dev
COPY --from=builder /build/dist /app

# Set environment variables
ENV APP_PORT=3000
ENV SIDECAR_PORT=3500
ENV STATE_STORE_NAME="session-statestore"

# Expose port
EXPOSE ${APP_PORT}

# Run app
CMD [ "node", "src/index.js" ]