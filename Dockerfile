# Use Node.js image to build the app
FROM node:18 AS build-stage

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
# RUN npm install --legacy-peer-deps
RUN npm cache clean --force && npm install -g @angular/cli && npm install --legacy-peer-deps


# Copy the rest of the app and build
COPY . .
RUN npm run build -- --configuration=production

# Use Nginx to serve the app
FROM nginx:alpine
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
