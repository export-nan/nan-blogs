FROM nginx as pruned
WORKDIR /app
COPY . .


FROM nginx
WORKDIR /app
COPY  --from=pruned /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY  --from=pruned /app/src/.vuepress/dist /usr/share/nginx/html/nan-blogs