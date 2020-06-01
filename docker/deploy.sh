#!/bin/bash

echo "*** Destroyer2 docker deployer ***"
echo "=================================="
echo ""

# Help menu
if [ $# -eq 0 ] || [ "$1" == "help" ]; then
   bash docker/scripts/help.sh
   exit 0
fi

# Input validation
printf "Doing "
case "$1" in 
  "simple" ) printf "simple deployment\n";;
  "reverse-proxy" ) printf "reverse-proxy deployment\n";;
  "clean" ) printf "clean-up\n";;
  "stop" ) printf "stopping\n";;
  * ) printf "unknown -- invalid!\n";exit 1;
esac

# Sudo note
echo ""
echo "*** Note: ***"
echo "If docker should throw an error you might want to try"
echo "running this same script as sudo user (sudo docker/deploy.sh)"
echo ""

# Clean
if [ "$1" == "clean" ]; then
    bash docker/scripts/clean.sh

# Stop
elif [ "$1" == "stop" ]; then
    bash docker/scripts/stop.sh

# Simple Deploy
elif [ "$1" == "simple" ]; then
    bash docker/scripts/simple.sh

# Reverse-proxy Deploy
elif [ "$1" == "reverse-proxy" ]; then
    bash docker/scripts/reverse-proxy.sh
fi
