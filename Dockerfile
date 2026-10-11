FROM php:8.4-fpm

# Install system dependencies, Nginx, and Node.js
RUN apt-get update && apt-get install -y \
    git curl zip unzip nginx libpng-dev libonig-dev libxml2-dev libzip-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Copy nginx config + startup script
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Create SQLite DB if it doesn't exist and fix ownership
RUN touch /var/www/database/database.sqlite \
    && chown -R www-data:www-data /var/www/database \
    && chmod -R 775 /var/www/database

EXPOSE 8080
CMD ["/usr/local/bin/start.sh"]
