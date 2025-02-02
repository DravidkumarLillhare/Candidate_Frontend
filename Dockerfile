# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build -- --configuration=production

# Use an official Nginx image to serve the Angular application
FROM nginx:alpine

# Copy the built Angular application to the Nginx HTML directory
COPY --from=0 /app/dist/candidate-frontend /usr/share/nginx/html

# Make port 1111 available to the world outside this container
EXPOSE 1111
