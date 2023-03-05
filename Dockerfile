# Get node image
FROM node

# Create app directory
WORKDIR /app

# Copy app source and configs
COPY . .

# Install and build app
RUN npm install
RUN npm run build

# Set environment variables
ENV APP_PORT=3000
ENV SIDECAR_PORT=3500
ENV STATE_STORE_NAME="session-statestore"

# Expose port
EXPOSE ${APP_PORT}

# Run app
CMD [ "node", "dist/src/index.js" ]