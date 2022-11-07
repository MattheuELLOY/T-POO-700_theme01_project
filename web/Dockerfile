FROM node:lts-alpine as build
RUN mkdir /app
COPY . /app

WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm run build
FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
