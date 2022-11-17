#!/bin/bash

if [ true ]; then
    echo "SSL enabled, will configure https"

    SSL_FILES_DIR=/etc/pki/tls/certs
    mkdir -p $SSL_FILES_DIR
    aws s3 cp s3://cardiov-assets/SSL/fullchain.pem $SSL_FILES_DIR/server.crt
    aws s3 cp s3://cardiov-assets/SSL/privkey.pem $SSL_FILES_DIR/server.key

    cp scripts/https/https.conf /etc/nginx/conf.d/docker-redirect.conf
else
    echo "SSL not enabled, configuring port 80"
    cp scripts/https/listen-80.conf /etc/nginx/conf.d/docker-redirect.conf
fi

systemctl restart nginx
