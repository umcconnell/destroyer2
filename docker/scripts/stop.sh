#!/bin/bash

echo "docker stop \$(docker ps -q)"
echo ""
docker stop $(docker ps -q)