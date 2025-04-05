# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --legacy-peer-deps

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/fuse/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 