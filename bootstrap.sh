#!/usr/bin/env bash

add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install -y apache2 curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
apt-get install -y nodejs

if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi