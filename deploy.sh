#!/bin/bash

docker-compose down
docker-compose build
docker-compose up -d
docker cp react-jblog-admimn_container:/home/react-jblog-admin/dist /home/git/blog/work/react-jblog-admin/dist
docker cp /home/git/blog/work/react-jblog-admin/dist nginx_container:/usr/share/nginx/html/react-jblog-admin
echo "构建成功"









