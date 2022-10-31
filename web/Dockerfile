FROM node:lts-alpine as build
RUN mkdir /app
COPY . /app

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
COPY tools/nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]