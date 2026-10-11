#!/bin/sh
set -e

PORT="${PORT:-8080}"
sed -i "s/__PORT__/${PORT}/" /etc/nginx/nginx.conf

# Make sure runtime dirs are writable by PHP-FPM user
mkdir -p /run/php
chown -R www-data:www-data /run/php /var/www/storage /var/www/bootstrap/cache /var/www/database
chmod -R 775 /var/www/storage /var/www/bootstrap/cache /var/www/database

php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations as www-data
su -s /bin/sh www-data -c "php artisan migrate --force"

php-fpm -D
nginx -g "daemon off;"
