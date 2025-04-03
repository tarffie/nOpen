# Use the official PHP CLI image as the base
FROM php:8.4.1-cli

# Set environment variables for user and group ID
ARG UID=1000
ARG GID=1000

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    unzip \
    libpq-dev \
    libonig-dev \
    libssl-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    libzip-dev \
    && docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    opcache \
    intl \
    zip \
    bcmath \
    soap \
    && pecl install redis xdebug \
    && docker-php-ext-enable redis xdebug \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Configure Xdebug
ARG XDEBUG_ENABLED=false
ARG XDEBUG_MODE=develop,debug
ARG XDEBUG_HOST=host.docker.internal
ARG XDEBUG_IDE_KEY=PHPSTORM
ARG XDEBUG_LOG=/tmp/xdebug.log
ARG XDEBUG_LOG_LEVEL=7

RUN if [ "${XDEBUG_ENABLED}" = "true" ]; then \
    echo "xdebug.mode=${XDEBUG_MODE}" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini && \
    echo "xdebug.idekey=${XDEBUG_IDE_KEY}" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini && \
    echo "xdebug.log=${XDEBUG_LOG}" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini && \
    echo "xdebug.log_level=${XDEBUG_LOG_LEVEL}" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini && \
    echo "xdebug.client_host=${XDEBUG_HOST}" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini ; \
    echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini ; \
fi

# Create custom user matching host user
RUN if ! getent group ${GID}; then groupadd -g ${GID} www; fi && \
    if ! getent passwd ${UID}; then useradd -u ${UID} -g ${GID} -m www; fi && \
    mkdir -p /var/www/html && \
    chown -R ${UID}:${GID} /var/www

# Create www-data user with different UID/GID (fallback)
RUN if [ "${UID}" -ne 82 ]; then \
    usermod -u 82 www-data || true && \
    groupmod -g 82 www-data || true; \
fi

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY --chown=${UID}:${GID} . .

# Install dependencies
RUN if [ -f "composer.json" ]; then composer install --optimize-autoloader --no-dev; fi

# Ensure storage and bootstrap/cache are writable
RUN mkdir -p storage/framework/{sessions,views,cache} && \
    mkdir -p bootstrap/cache && \
    chown -R ${UID}:${GID} storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Create PsySH config directory
RUN mkdir -p /var/www/.config/psysh && \
    chown -R ${UID}:${GID} /var/www/.config

# Switch to the custom user
USER ${UID}

# Default command
CMD ["sh"]
