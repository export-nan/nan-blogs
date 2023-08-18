docker stop nan-blogs

docker rm nan-blogs

docker rmi nan47/nan-blogs

docker pull nan47/nan-blogs

docker run -p 80:80 -d --name nan-blogs nan47/nan-blogs
