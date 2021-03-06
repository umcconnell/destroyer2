#!/bin/bash

COMPOSE="/usr/local/bin/docker-compose --no-ansi"
DOCKER="/usr/bin/docker"

cd {{BASE_DIR}}/docker/reverse-proxy/
$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP nginx
$DOCKER system prune -af
