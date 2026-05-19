#!/bin/bash

set -e

echo "Installing packages..."

npm install sequelize pg pg-hstore
npm install -D sequelize-cli

echo "Initializing sequelize..."

npx sequelize-cli init

echo "Generating models..."

npx sequelize-cli model:generate --name Apartment --attributes title:string,description:text,pricePerNight:float,location:string

npx sequelize-cli model:generate --name Review --attributes apartmentId:integer,user:string,comment:text

npx sequelize-cli model:generate --name Rating --attributes apartmentId:integer,value:integer

npx sequelize-cli model:generate --name Reservation --attributes apartmentId:integer,guestName:string,checkIn:date,checkOut:date

npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string

echo "Running migrations..."

npx sequelize-cli db:migrate

echo "Done."