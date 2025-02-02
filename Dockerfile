# Use an official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli && npm install

# Copy the rest of the project files
COPY . .

# Build the Angular application
RUN npm run build -- --configuration=production

# Use an official Nginx image to serve the Angular application
FROM nginx:alpine

# Copy built files to Nginx's default directory
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
