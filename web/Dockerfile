FROM node:lts-alpine as build
RUN mkdir /app
COPY . /app

WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
