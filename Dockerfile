FROM node:18.16.0-alpine
 
WORKDIR /app
 
# COPY package.json /app/
 
COPY . /app/

RUN yarn
