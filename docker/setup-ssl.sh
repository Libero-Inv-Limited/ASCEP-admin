#!/bin/sh
# SSL Setup Script for Let's Encrypt - Admin App

set -e

DOMAIN=${DOMAIN:-adminlens.anambrastate.gov.ng}
EMAIL=${EMAIL:-admin@anambrastate.gov.ng}

echo "=== SSL Certificate Setup ==="
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"

# Check if certificates already exist
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "✓ SSL certificates already exist for $DOMAIN"
    exit 0
fi

echo "⚙ Requesting new SSL certificate..."

# Request certificate from Let's Encrypt
certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d "$DOMAIN"

if [ $? -eq 0 ]; then
    echo "✓ SSL certificate successfully created"
    echo "✓ Certificate location: /etc/letsencrypt/live/$DOMAIN/"

    # Switch to HTTPS nginx configuration
    echo "⚙ Switching to HTTPS configuration..."
    cp /etc/nginx/conf.d/default-https.conf.template /etc/nginx/conf.d/default.conf

    # Test nginx configuration
    nginx -t
    if [ $? -eq 0 ]; then
        # Reload nginx to use new certificates and HTTPS config
        nginx -s reload
        echo "✓ Nginx reloaded with HTTPS configuration"
        echo "✓ SSL setup complete! Site is now accessible via HTTPS"
    else
        echo "✗ Nginx configuration test failed"
        exit 1
    fi
else
    echo "✗ Failed to obtain SSL certificate"
    exit 1
fi
