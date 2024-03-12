FROM php:7.3.3-apache
LABEL author="Shiina"
COPY cert.pem /etc/apache2/ssl/cert.pem
COPY privkey.pem /etc/apache2/ssl/privkey.pem
COPY 000-default.conf /etc/apache2/sites-enabled/000-default.conf
RUN apt-get update --allow-unauthenticated && apt-get -y upgrade --allow-unauthenticated\
    && docker-php-ext-install mysqli && docker-php-ext-enable mysqli\
    && a2enmod rewrite && a2enmod ssl && service apache2 restart
    # && apt-get install -y ssl-cert && a2enmod ssl && a2ensite default-ssl.conf
# For time zone
# ENV TZ=Asia/Taipei
#RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone
EXPOSE 80 443

