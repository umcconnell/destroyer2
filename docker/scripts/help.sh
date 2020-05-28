#!/bin/bash

# Help menu
echo "Usage:"
echo "  ./docker/deploy.sh [COMMAND]"
echo ""
echo "Commands:"
echo "  help             Show this help"
echo "  simple           Simple docker setup (node and redis)"
echo "  reverse-proxy    Reverse-proxy setup (nginx, node and redis)"
echo "  clean            Clean-up all unused docker images"
echo "  stop             Stop all running docker containers"
exit 0
