# ================= Base image =================
FROM php:8.2-fpm

# ================= Install system dependencies =================
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    zip \
    vim \
    && docker-php-ext-install pdo_mysql mbstring zip bcmath xml intl curl exif pcntl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ================= Install Composer =================
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ================= Set working directory =================
WORKDIR /var/www/html

# ================= Copy application =================
# Copy everything first so artisan exists
COPY . .

# ================= Install PHP dependencies =================
# Now composer can run post-autoload scripts without failing
RUN php -d memory_limit=-1 /usr/bin/composer install --no-dev --optimize-autoloader

# ================= Set permissions =================
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# ================= Expose port =================
EXPOSE 9000

# ================= Start PHP-FPM =================
CMD ["php-fpm"]

