docker system prune -f

docker stop nan-blogs

docker rm nan-blogs

docker rmi nan-blogs

docker build -t nan-blogs .

docker run -p 80:80 -d --name nan-blogs nan-blogs
