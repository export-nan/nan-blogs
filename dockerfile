FROM node as build
WORKDIR /app
RUN npm i -g pnpm
COPY . .
RUN pnpm install
RUN pnpm docs:build

FROM nginx
WORKDIR /app
COPY ./nginx.conf /etc/nginx/conf.d/nan-blogs.conf
COPY ./src/.vuepress/dist /usr/share/nginx/html/nan-blogs