#!/bin/bash

echo "docker-compose -f docker/simple/docker-compose.yml up -d"
echo ""
docker-compose -f docker/simple/docker-compose.yml up -d
echo ""
echo "Done!"
echo "Run docker ps to see running processes"
echo "Run docker stop CONTAINER_ID to stop a container"