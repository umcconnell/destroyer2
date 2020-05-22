#!/bin/bash

function ask_yes_or_no() {
    read -p "$1 ([Y]es or [N]o): " 
    case $(echo $REPLY | tr '[A-Z]' '[a-z]') in
        y|Y|yes|Yes ) echo "yes" ;;
        *)            echo "no" ;;
    esac
}

# Base Directory
echo "=== Enter the absolute path to your base app folder ==="
echo "(e.g. /home/john/Documents/apps/destroyer2/)"

read -p "> [$PWD]: " cwd
BASE_DIR=${cwd:-"$PWD"}
export BASE_DIR
echo ""

# DH Param
if [ ! -f deploy/reverse-proxy/dhparam/dhparam-2048.pem ]; then
    echo "=== Create Diffie-Hellman Parameters ==="
    echo "openssl dhparam -out deploy/reverse-proxy/dhparam/dhparam-2048.pem 2048"
    echo ""
    openssl dhparam -out deploy/reverse-proxy/dhparam/dhparam-2048.pem 2048
    echo ""
fi

# Deployment mode
echo "=== Deployment Mode ==="
echo ""

PS3="Choose a mode: "
options=("Production Deployment" "Local Development")
select opt in "${options[@]}"
do
    case $opt in
        "Production Deployment")
            # Production deployment
            echo "*** Note: ***"
            echo "This will modify"
            echo "- deploy/reverse-proxy/docker-compose.yml"
            echo "- deploy/reverse-proxy/nginx-conf/nginx.conf"
            echo "- deploy/reverse-proxy/ssl-renewal.sh"
            echo ""

            if [ "no" == $(ask_yes_or_no "Continue?") ]; then
                exit 0
            fi

            # Generate config files
            echo "Generate docker-compose.yml"
            cp deploy/reverse-proxy/~docker-compose.yml deploy/reverse-proxy/docker-compose.yml
            echo "Generate nginx.conf"
            cp deploy/reverse-proxy/nginx-conf/~nginx.conf deploy/reverse-proxy/nginx-conf/nginx.conf
            echo "Generate ssl-renewal.sh"
            cp deploy/reverse-proxy/~ssl-renewal.sh deploy/reverse-proxy/ssl-renewal.sh

            # Get email
            echo "=== Email ==="
            echo "Enter your email address used for certbot (e.g. john.doe@example.com)"
            read -p "> " email
            DOMAIN_EMAIL=$email
            export DOMAIN_EMAIL
            echo ""

            # Get domain
            echo "=== Domain Name ==="
            echo "Enter your domain name (e.g. example.com)"
            read -p "> " domain
            DOMAIN_NAME=$domain
            export DOMAIN_NAME
            echo ""

            # Write changes to file
            sed -i -e 's|{{BASE_DIR}}|'$BASE_DIR'|g' deploy/reverse-proxy/docker-compose.yml
            sed -i -e 's|{{BASE_DIR}}|'$BASE_DIR'|g' deploy/reverse-proxy/ssl-renewal.sh
            sed -i -e 's|{{DOMAIN_NAME}}|'$DOMAIN_NAME'|g' deploy/reverse-proxy/docker-compose.yml
            sed -i -e 's|{{DOMAIN_NAME}}|'$DOMAIN_NAME'|g' deploy/reverse-proxy/nginx-conf/nginx.conf
            sed -i -e 's|{{DOMAIN_EMAIL}}|'$DOMAIN_EMAIL'|g' deploy/reverse-proxy/docker-compose.yml

            chmod +x deploy/reverse-proxy/ssl-renewal.sh

            # Docker
            echo "=== Docker ==="
            echo "docker-compose -f deploy/reverse-proxy/docker-compose.yml up -d"
            echo ""
            docker-compose -f deploy/reverse-proxy/docker-compose.yml up -d
            echo ""

            echo "docker-compose up --force-recreate --no-deps certbot"
            echo ""
            sed -i -e "s/--staging/--force-renewal/g" deploy/reverse-proxy/docker-compose.yml
            docker-compose up --force-recreate --no-deps certbot
            echo ""

            # Cron job
            echo "=== Cron Job ==="
            echo "Renew your certificate once a day at 3am"
            if [ "yes" == $(ask_yes_or_no "Add to cron?") ]; then
                ( crontab -l 2>/dev/null | grep -Fv ssl-renew ; printf -- "0 3 * * * $BASE_DIR/deploy/reverse-proxy/ssl-renew.sh >> /var/log/cron.log 2>&1" ) | crontab
            fi

            echo ""
            echo "Done!"
            echo "Destroyer2 should be available under https://$DOMAIN_NAME"
            
            break
            ;;
        "Local Development")
            # Local deployment
            # Generate ssl keys
            if [ "yes" == $(ask_yes_or_no "Generate SSL Keys?") ]; then
                openssl req -x509 -subj '/CN=localhost' -nodes -newkey rsa:4096\
                -keyout deploy/reverse-proxy/keys/key.pem \
                -out deploy/reverse-proxy/keys/cert.pem -days 365

                echo "*** Note: ***"
                echo "This certificate will not be trusted in your browser!"
                echo "You may safely ignore this warning for local development"
                echo ""
            fi

            # Docker
            echo "docker-compose -f deploy/reverse-proxy/docker-compose.local.yml up -d"
            echo ""
            docker-compose -f deploy/reverse-proxy/docker-compose.local.yml up -d
            echo ""
            echo "Done!"
            echo "Run docker ps to see running processes"
            echo "Run docker stop CONTAINER_ID to stop a container"
            echo "Open https://localhost in your browser"

            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
