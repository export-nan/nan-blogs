# docker 镜像配置
FROM nginx
# nginx.conf
COPY nginx.conf /etc/nginx/conf.d/nan-blogs.conf
# 静态文件
COPY ./src/.vuepress/dist /usr/share/nginx/html/nan-blogs


FROM node:18.14.0 as build
WORKDIR /app
RUN npm i -g pnpm
COPY . .
RUN pnpm install
RUN pnpm docs:build


FROM node:18.14.0
WORKDIR /app
COPY --from=build  /app/nginx.conf /etc/nginx/conf.d/nan-blogs.conf
COPY --from=build /app/src/.vuepress/dist /usr/share/nginx/html/nan-blogs