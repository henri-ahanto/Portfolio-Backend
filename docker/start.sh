#!/bin/sh
set -e

# Use Render's assigned port, default to 8080 locally
PORT="${PORT:-8080}"

# Inject the port into nginx config
sed -i "s/__PORT__/${PORT}/" /etc/nginx/nginx.conf

# Laravel runtime setup
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force

# Start PHP-FPM in background
php-fpm -D

# Start Nginx in foreground (keeps container alive)
nginx -g "daemon off;"
