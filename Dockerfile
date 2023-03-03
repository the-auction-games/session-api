# Get node image
FROM node
# Create app directory
WORKDIR /app
# Copy app source and configs
COPY . .
# Install and build app
RUN npm install
RUN npm run build
# Expose port
EXPOSE 3000
# Run app
CMD [ "node", "dist/src/index.js" ]